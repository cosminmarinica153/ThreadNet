using backend.Models;

namespace backend.Interfaces
{
    public interface ICategoryRepository
    {
        // GET
        ICollection<Category> GetAll();
        Category GetOne(int id);
        Category GetByName(string name);
        Category GetLastCategory();
        ICollection<ThreadComponent> GetThreads(int id);
        int GetPopularityScore(int id);
        ICollection<Category> GetTopCategories(int count);

        // CRUD Operations
        bool CreateCategory(Category category);
        bool UpdateCategory(Category category);
        bool DeleteCategory(Category categoryId);

        // Misc
        bool Save();
        bool Exists(int id);
        bool CheckUniqueName(string name);
    }
}
