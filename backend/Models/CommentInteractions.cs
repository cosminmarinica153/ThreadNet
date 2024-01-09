namespace backend.Models
{
    public class CommentInteractions
    {
        public int UpVotes;
        public int DownVotes;

        public int ReplyCount;

        public CommentInteractions(int upVotes, int downVotes, int replyCount)
        {
            UpVotes = upVotes;
            DownVotes = downVotes;
            ReplyCount = replyCount;
        }
    }
}
