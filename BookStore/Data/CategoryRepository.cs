using Bookstore.Models;
using Bookstore.Utils;

namespace Bookstore.Data
{
    public class CategoryRepository
    {

        private readonly BookShopContext _dbContext;

        public CategoryRepository(BookShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Category> GetCategoryList()
        {

            return _dbContext.Categories.ToList();
        }


    }
}
