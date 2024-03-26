namespace backend.Models
{
    public class UserContentInteractions
    {
        public List<int> FavouriteCategories { get; set; } = [];
        public List<int> FavouriteThreads { get; set; } = [];
        public List<int> Following { get; set; } = [];
        public List<int> UpVotedThreads { get; set; } = [];
        public List<int> DownVotedThreads { get; set; } = [];
        public List<int> UpVotedComments { get; set; } = [];
        public List<int> DownVotedComments { get; set; } = [];
        public List<int> UpVotedReplies { get; set; } = [];
        public List<int> DownVotedReplies { get; set; } = [];

        public UserContentInteractions(List<int> favouriteCategories, List<int> favouriteThreads, List<int> following,
                                       List<int> upVotedThreads, List<int> downVotedThreads, List<int> upVotedComments,
                                       List<int> downVotedComments, List<int> upVotedReplies, List<int> downVotedReplies)
        {
            FavouriteCategories = favouriteCategories;
            FavouriteThreads = favouriteThreads;
            Following = following;
            UpVotedThreads = upVotedThreads;
            DownVotedThreads = downVotedThreads;
            UpVotedComments = upVotedComments;
            DownVotedComments = downVotedComments;
            UpVotedReplies = upVotedReplies;
            DownVotedReplies = downVotedReplies;
        }
    }
}
