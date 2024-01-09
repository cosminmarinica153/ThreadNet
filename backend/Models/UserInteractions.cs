namespace backend.Models
{
    public class UserInteractions
    {
        // Categories
        public int FavouriteCategories;

        // Threads
        public int FavouriteThreads;
        public int CreatedThreads;
        public int UpVotedThreads;
        public int DownVotedThreads;

        // Comments
        public int CreatedComments;
        public int UpVotedComments;
        public int DownVotedComments;

        // User
        public int Followers;
        public int Following;

        public UserInteractions(int favouriteCategories, int favouriteThreads, int createdThreads, int upVotedThreads,
                               int downVotedThreads, int createdComments, int upVotedComments, int downVotedComments,
                               int followers, int following)
        {
            FavouriteCategories = favouriteCategories;

            FavouriteThreads = favouriteThreads;
            CreatedThreads = createdThreads;
            UpVotedThreads = upVotedThreads;
            DownVotedThreads = downVotedThreads;

            CreatedComments = createdComments;
            UpVotedComments = upVotedComments;
            DownVotedComments = downVotedComments;

            Followers = followers;
            Following = following;
        }
    }
}
