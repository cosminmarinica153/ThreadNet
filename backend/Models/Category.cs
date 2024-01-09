namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ThreadComponent> Threads { get; set; }
        public ICollection<FavouriteCategory> FavouriteCategories { get; set; }
    }
}
