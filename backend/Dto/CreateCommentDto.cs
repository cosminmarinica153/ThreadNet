namespace backend.Dto
{
    public class CreateCommentDto
    {
        public int userId { get; set; }
        public int threadId { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
    }
}
