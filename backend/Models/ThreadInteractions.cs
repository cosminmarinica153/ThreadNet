namespace backend.Models
{
    public class ThreadInteractions
    {
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }

        public int CommentsCount { get; set; }

        public ThreadInteractions(int upVotes, int downVotes, int commentsCount)
        {
            UpVotes = upVotes;
            DownVotes = downVotes;
            CommentsCount = commentsCount;
        }
    }
}
