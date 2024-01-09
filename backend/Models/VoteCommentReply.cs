namespace backend.Models
{
    public class VoteCommentReply
    {
        public int UserId { get; set; }
        public int CommentReplyId { get; set; }
        public User User { get; set; }
        public CommentReply CommentReply { get; set; }
        public string VoteType { get; set; }
    }
}
