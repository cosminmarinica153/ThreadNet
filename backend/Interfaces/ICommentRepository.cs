using backend.Models;

namespace backend.Interfaces
{
    public interface ICommentRepository
    {
        // GET
        ICollection<Comment> GetAll();
        Comment GetOne(int id);
        ICollection<CommentReply> GetReplies(int id);
        CommentInteractions GetInteractions(int id);

        // CRUD Operations
        bool CreateComment(Comment comment, int userId, int threadId);
        bool UpdateComment(Comment comment);
        bool DeleteComment(Comment comment);

        // Misc
        bool Save();
        bool Exists(int id);
    }
}
