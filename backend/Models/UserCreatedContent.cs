namespace backend.Models
{
    public class UserCreatedContent
    {
        public List<int> Threads { get; set; }
        public List<int> Comments { get; set; }
        public List<int> CommentReplies { get; set; }

        public UserCreatedContent(List<int> threads, List<int> comments, List<int> commentReplies)
        {
            Threads = threads;
            Comments = comments;
            CommentReplies = commentReplies;
        }
    }
}
