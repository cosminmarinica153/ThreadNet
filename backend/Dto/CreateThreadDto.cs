namespace backend.Dto
{
    public class CreateThreadDto
    {
        public int userId { get; set; }
        public int categoryId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
    }
}
