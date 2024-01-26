using backend.Data;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext context;

        public CategoryRepository(DataContext context)
        {
            this.context = context;
        }

        public ICollection<Category> GetAll()
        {
            return context.Categories.OrderBy(p => p.Id).ToList();  
        }

        public Category GetOne(int id)
        {
            return context.Categories.Find(id);
        }

        public ICollection<ThreadComponent> GetThreads(int id)
        {
            return context.Threads.Where(t => t.Category.Id == id).Include(t => t.User).ToList();
        }

        public int GetPopularityScore(int id)
        {
            var score = 0;

            var favouriteCategoriesCount = context.FavouriteCategories.Where(fc => fc.CategoryId == id).Count();
            score += favouriteCategoriesCount * ScoreTable.categoryFavourite;
            
            var threadsInCategoryCount = context.Threads.Where(t => t.Category.Id == id).Count();
            score += threadsInCategoryCount * ScoreTable.categoryThread;

            return score;
        }

        public ICollection<Category> GetTopCategories(int count)
        {
            var categories = context.Categories.ToList();

            var topCategories = categories.OrderByDescending(c => GetPopularityScore(c.Id)).ToList();

            topCategories.RemoveRange(count, categories.Count - count);

            return topCategories;
        }

        public bool CreateCategory(Category category)
        {
            context.Categories.Add(category);
            return Save();
        }

        public bool UpdateCategory(Category category)
        {
            context.Categories.Update(category);
            return Save();
        }

        public bool DeleteCategory(Category category)
        {
            context.Categories.Remove(category);
            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Exists(int id)
        {
            return context.Categories.Where(c => c.Id == id).Any();
        }
    }
}
