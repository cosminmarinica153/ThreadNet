using backend.Models;

namespace backend.Interfaces
{
    public interface ICommentReplyRepository
    {
        // GET
        ICollection<CommentReply> GetAll();
        CommentReply GetOne(int id);
        CommentReplyInteractions GetInteractions(int id);

        // CRUD Operations
        bool CreateCommentReply(CommentReply commentReply, int userId, int commentId);
        bool UpdateCommentReply(CommentReply commentReply);
        bool DeleteCommentReply(CommentReply commentReply);

        // Misc
        bool Save();
        bool Exists(int id);
    }
}
