using backend.Models;

namespace backend.Interfaces
{
    public interface IThreadRepository
    {
        // GETTERS
        ICollection<ThreadComponent> GetAll();
        ThreadComponent GetOne(int id);
        ICollection<Comment> GetComments(int id);
        ISet<User> GetDiscussionParticipants(int id);
        int GetPopularityScore(int id);
        ThreadInteractions GetInteractions(int id);

        // CRUD Operations
        bool CreateThread(ThreadComponent thread, int userId, int categoryId);
        bool UpdateThread(ThreadComponent thread);
        bool DeleteThread(ThreadComponent thread);

        // Misc
        bool Save();
        bool Exists(int id);
    }
}
