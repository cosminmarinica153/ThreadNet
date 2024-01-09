namespace backend.Dto
{
    public class UserCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
    }
}
