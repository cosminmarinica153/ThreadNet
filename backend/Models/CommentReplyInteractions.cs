namespace backend.Models
{
    public class CommentReplyInteractions
    {
        public int upVotes;
        public int downVotes;

        public CommentReplyInteractions(int upVotes, int downVotes)
        {
            this.upVotes = upVotes;
            this.downVotes = downVotes;
        }
    }
}
