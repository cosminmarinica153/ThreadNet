using backend.Data;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ThreadRepository : IThreadRepository
    {
        private readonly DataContext context;
        private readonly ICommentRepository commentRepository;

        public ThreadRepository(DataContext context, ICommentRepository commentRepository)
        {
            this.context = context;
            this.commentRepository = commentRepository;
        }

        public ICollection<ThreadComponent> GetAll()
        {
            return context.Threads.OrderBy(p => p.Id).ToList();
        }

        public ThreadComponent GetOne(int id)
        {
            return context.Threads.Find(id);
        }

        public ICollection<Comment> GetComments(int id)
        {
            return context.Comments.Where(c => c.Thread.Id == id).ToList();
        }

        public ISet<User> GetDiscussionParticipants(int id)
        {
            ISet<User> participants = new HashSet<User>();
            
            var thread = context.Threads.Include(t => t.User).Where(t => t.Id == id).First();
            participants.Add(thread.User);

            var comments = context.Comments.Include(c => c.User).Where(c => c.Thread.Id ==id).ToList(); 
            foreach(var comment in comments)
            {
                participants.Add(comment.User);

                var replies = context.CommentReplies.Include(cr => cr.User).Where(cr => cr.Comment.Id == comment.Id).ToList();
                foreach (var reply in replies)
                    participants.Add(reply.User);
            }

            return participants;
        }

        public int GetPopularityScore(int id)
        {
            int score = 0;

            var favouriteThreadCount = context.FavouriteThreads.Where(ft => ft.ThreadId == id).Count();
            score += favouriteThreadCount * ScoreTable.threadFavourite;

            var comments = context.Comments.Where(c => c.Thread.Id == id);
            var commentCount = comments.Count();
            score += commentCount * ScoreTable.threadComment;

            int commentReplyCount = 0;
            foreach (var comment in comments)
                commentReplyCount += context.CommentReplies.Where(cr => cr.Comment.Id == comment.Id).Count();
            score += commentReplyCount * ScoreTable.threadReply;

            int threadUpVoteCount = context.VoteThread.Where(vt => vt.VoteType == "upVote" && vt.ThreadId == id).Count();
            score += threadUpVoteCount * ScoreTable.threadUpVote;

            int threadDownVoteCount = context.VoteThread.Where(vt => vt.VoteType == "downVote" && vt.ThreadId == id).Count();
            score += threadUpVoteCount * ScoreTable.threadDownVote;

            return score;
        }

        public ThreadInteractions GetInteractions(int id)
        {
            int upVotes = context.VoteThread.Where(vt => vt.ThreadId == id && vt.VoteType == "upVote").Count();
            int downVotes = context.VoteThread.Where(vt => vt.ThreadId == id && vt.VoteType == "downVote").Count();

            var threadComments = context.Comments.Where(c => c.Thread.Id == id).ToList();
            int commentsCount = threadComments.Count();

            foreach (var comment in threadComments)
            {
                var commentReplies = context.CommentReplies.Where(cr => cr.Comment.Id == comment.Id).ToList();
                commentsCount += commentReplies.Count();
            }

            ThreadInteractions interactions = new ThreadInteractions(upVotes, downVotes, commentsCount);

            return interactions;
        }

        public bool CreateThread(ThreadComponent thread, int userId, int categoryId)
        {
            var user = context.Users.Find(userId);
            var category = context.Categories.Find(categoryId);

            thread.User = user;
            thread.Category = category;

            context.Threads.Add(thread);

            return Save();
        }

        public bool UpdateThread(ThreadComponent thread)
        {
            context.Threads.Update(thread);
            return Save();
        }

        public bool DeleteThread(ThreadComponent thread)
        {
            // Delete Thread Comments
            var comments = context.Comments.Where(c => c.Thread.Id == thread.Id).ToList();

            foreach (var comment in comments)
                if (!commentRepository.DeleteComment(comment))
                    return false;

            // Delete Thread Interactions
            var voteThreads = context.VoteThread.Where(vt => vt.ThreadId == thread.Id).ToList();

            foreach(var vote in voteThreads)
            {
                context.VoteThread.Remove(vote);
                if (!Save())
                    return false;
            }

            var favouriteThreads = context.FavouriteThreads.Where(ft => ft.ThreadId == thread.Id).ToList();

            foreach (var favouriteThread in favouriteThreads)
            {
                context.FavouriteThreads.Remove(favouriteThread);
                if(!Save())
                    return false;
            }

            // Delete Thread after the interactions and comments are deleted
            context.Threads.Remove(thread);
            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Exists(int threadId)
        {
            return context.Threads.Where(t => t.Id == threadId).Any();
        }
    }
}
