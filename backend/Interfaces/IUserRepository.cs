using backend.Dto;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        // GET
        ICollection<User> GetAll();
        User GetOne(int id);
        ICollection<User> GetFollowers(int id);
        ICollection<User> GetFollowing(int id);
        ICollection<Category> GetFavouriteCategories(int id);
        ICollection<ThreadComponent> GetFavouriteThreads(int id);
        ICollection<ThreadComponent> GetThreads(int id);
        ICollection<UserCommentDto> GetComments(int id);
        UserInteractions GetInteractions(int id);
        int GetProfileScore(int id);

        // CRUD Operations
        bool CreateUser(User user);
        bool CreateFollower(Follower follower);
        bool CreateFavouriteCategory(FavouriteCategory favouriteCategory);
        bool CreateFavouriteThread(FavouriteThread favouriteThread);
        bool CreateVoteThread(VoteThread voteThread);
        bool CreateVoteComment(VoteComment voteComment);
        bool CreateVoteCommentReply(VoteCommentReply voteReply);
        bool UpdateUser(User user);
        bool UpdateVoteThread(VoteThread voteThread);
        bool UpdateVoteComment(VoteComment voteComment);
        bool UpdateVoteCommentReply(VoteCommentReply voteCommentReply);
        bool DeleteUser(User user);
        bool DeleteFollower(Follower follower);
        bool DeleteFollowing(Follower follower);
        bool DeleteFavouriteCategory(FavouriteCategory favouriteCategory);
        bool DeleteFavouriteThread(FavouriteThread favouriteThread);
        bool DeleteVoteThread(VoteThread voteThread);
        bool DeleteVoteComment(VoteComment voteComment);
        bool DeleteVoteCommentReply(VoteCommentReply voteCommentReply);

        // Misc
        bool Save();
        bool Exists(int id);
        bool FeatureExists(int userId, int featureId, string type);
        object GetFeature(int userId, int featureId, string type);
        User GetByUsername(string username);
    }
}
