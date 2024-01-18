namespace backend.Models
{
    public class CommentInteractions
    {
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }

        public int ReplyCount { get; set; }

        public CommentInteractions(int upVotes, int downVotes, int replyCount)
        {
            UpVotes = upVotes;
            DownVotes = downVotes;
            ReplyCount = replyCount;
        }
    }
}
