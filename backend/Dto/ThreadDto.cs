using backend.Models;

namespace backend.Dto
{
    public class ThreadDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
    }
}
