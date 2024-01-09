namespace backend.Helpers
{
    public class ScoreTable
    {
        // User Scores
        public const int userFollower = 5;
        public const int userThreadFavourite = 10;
        public const int userThreadUpVote = 3;
        public const int userThreadDownVote = -2;
        public const int userCommentUpVote = 1;
        public const int userCommentDownVote = -2;
        public const int userUpVote = 1;

        // Category Scores
        public const int categoryFavourite = 5;
        public const int categoryThread = 2;

        // Thread Scores
        public const int threadFavourite = 5;
        public const int threadComment = 3;
        public const int threadReply = 2;
        public const int threadUpVote = 1;
        public const int threadDownVote = -1;

        // Comment Scores


        // CommentReply Scores
        public const int replyUpVote = 1;
        public const int replyDownVote = -1;
    }
}
