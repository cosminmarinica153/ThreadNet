namespace backend.Dto
{
    public class VoteDto
    {
        public int UserId { get; set; }
        public int ContentId { get; set; }
        public string VoteType { get; set; }
    }
}
