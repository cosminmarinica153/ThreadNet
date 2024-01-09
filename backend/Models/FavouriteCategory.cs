namespace backend.Models
{
    public class FavouriteCategory
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }

    }
}
