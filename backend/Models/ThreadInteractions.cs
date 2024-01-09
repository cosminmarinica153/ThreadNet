namespace backend.Models
{
    public class ThreadInteractions
    {
        public int UpVotes;
        public int DownVotes;

        public int CommentsCount;

        public ThreadInteractions(int upVotes, int downVotes, int commentsCount)
        {
            UpVotes = upVotes;
            DownVotes = downVotes;
            CommentsCount = commentsCount;
        }
    }
}
