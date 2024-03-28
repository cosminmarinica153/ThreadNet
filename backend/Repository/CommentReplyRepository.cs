using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentReplyRepository : ICommentReplyRepository
    {
        private readonly DataContext context;

        public CommentReplyRepository(DataContext context)
        {
            this.context = context;
        }

        public ICollection<CommentReply> GetAll()
        {
            return context.CommentReplies.OrderBy(cr => cr.Id).Include(cr => cr.User).ToList();
        }

        public CommentReply GetOne(int id)
        {
            return context.CommentReplies.Where(cr => cr.Id == id).Include(cr => cr.User).FirstOrDefault();
        }

        public CommentReply GetLastCommentReply()
        {
            return context.CommentReplies.OrderBy(t => t.Id).Include(t => t.User).Last();
        }

        public CommentReplyInteractions GetInteractions(int id)
        {
            int upVotes = context.VoteCommentReply.Where(vcr => vcr.CommentReplyId == id && vcr.VoteType == "upVote").Count();
            int downVotes = context.VoteCommentReply.Where(vcr => vcr.CommentReplyId == id && vcr.VoteType == "downVote").Count();

            CommentReplyInteractions interactions = new CommentReplyInteractions(upVotes, downVotes);

            return interactions;
        }

        public bool CreateCommentReply(CommentReply commentReply, int userId, int commentId)
        {
            var user = context.Users.Find(userId);
            var comment = context.Comments.Find(commentId);

            commentReply.User = user;
            commentReply.Comment = comment;

            context.CommentReplies.Add(commentReply);
            return Save();
        }

        public bool UpdateCommentReply(CommentReply commentReply)
        {
            context.CommentReplies.Update(commentReply);
            return Save();
        }

        public bool DeleteCommentReply(CommentReply commentReply)
        {
            // Remove CommentReply Interactions
            var replyVotes = context.VoteCommentReply.Where(vcr => vcr.CommentReplyId == commentReply.Id).ToList();

            foreach (var replyVote in replyVotes)
            {
                context.VoteCommentReply.Remove(replyVote);
                if(!Save())
                    return false;
            }

            // Remove CommentReply after Interactions have been deleted
            context.CommentReplies.Remove(commentReply);
            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Exists(int id)
        {
            return context.CommentReplies.Where(cr => cr.Id == id).Any();
        }
    }
}
