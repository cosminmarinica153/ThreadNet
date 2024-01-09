namespace backend.Dto
{
    public class CreateCommentReplyDto
    {
        public int userId { get; set; }
        public int commentId { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
    }
}
