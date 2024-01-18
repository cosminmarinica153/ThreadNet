namespace backend.Models
{
    public class CommentReplyInteractions
    {
        public int upVotes {  get; set; }
        public int downVotes { get; set; }

        public CommentReplyInteractions(int upVotes, int downVotes)
        {
            this.upVotes = upVotes;
            this.downVotes = downVotes;
        }
    }
}
