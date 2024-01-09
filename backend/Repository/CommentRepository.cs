using backend.Data;
using backend.Interfaces;
using backend.Models;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext context;
        private readonly ICommentReplyRepository replyRepository;

        public CommentRepository(DataContext context, ICommentReplyRepository replyRepository)
        {
            this.context = context;
            this.replyRepository = replyRepository;
        }

        public ICollection<Comment> GetAll()
        {
            return context.Comments.OrderBy(c => c.Id).ToList();
        }

        public Comment GetOne(int id)
        {
            return context.Comments.Find(id);
        }

        public ICollection<CommentReply> GetReplies(int id)
        {
            return context.CommentReplies.Where(cr => cr.Comment.Id == id).ToList();
        }

        public CommentInteractions GetInteractions(int id)
        {
            int upVoteCount = context.VoteComment.Where(vc => vc.CommentId == id && vc.VoteType == "upVote").Count();
            int downVoteCount = context.VoteComment.Where(vc => vc.CommentId == id && vc.VoteType == "downVote").Count();
            int replyCount = context.CommentReplies.Where(cr => cr.Comment.Id == id).Count();

            CommentInteractions interactions = new CommentInteractions(upVoteCount, downVoteCount, replyCount);

            return interactions;
        }

        public bool CreateComment(Comment comment, int userId, int threadId)
        {
            var user = context.Users.Find(userId);
            var thread = context.Threads.Find(threadId);

            comment.User = user;
            comment.Thread = thread;

            context.Comments.Add(comment);
            return Save();
        }

        public bool UpdateComment(Comment comment)
        {
            context.Comments.Update(comment);
            return Save();
        }

        public bool DeleteComment(Comment comment)
        {
            // Remove Comment Comment Replies
            var replies = context.CommentReplies.Where(cr => cr.Comment.Id == comment.Id).ToList();

            foreach(var reply in replies) 
                if (!replyRepository.DeleteCommentReply(reply))
                    return false;

            // Remove Comment Interactions
            var voteComments = context.VoteComment.Where(vc => vc.CommentId == comment.Id).ToList();

            foreach(var vote in voteComments)
            {
                context.VoteComment.Remove(vote);
                if (!Save())
                    return false;
            }

            // Remove Comment
            context.Comments.Remove(comment);
            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Exists(int id)
        {
            return context.Comments.Where(c => c.Id == id).Any();
        }
    }
}
