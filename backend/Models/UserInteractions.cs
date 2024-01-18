namespace backend.Models
{
    public class UserInteractions
    {
        // Categories
        public int FavouriteCategories { get; set; }

        // Threads
        public int FavouriteThreads { get; set; }
        public int CreatedThreads {  get; set; } 
        public int UpVotedThreads { get; set; }
        public int DownVotedThreads { get; set; }

        // Comments
        public int CreatedComments { get; set; }
        public int UpVotedComments { get; set; }
        public int DownVotedComments { get; set; }

        // User
        public int Followers { get; set; }
        public int Following { get; set; }

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
