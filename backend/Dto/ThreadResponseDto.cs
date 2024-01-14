using backend.Models;

namespace backend.Dto
{
    public class ThreadResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}
