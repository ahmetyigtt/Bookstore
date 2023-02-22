using Bookstore.Data;
using Bookstore.Models;

namespace Bookstore.Services
{
    public class CategoryService
    {
        private readonly CategoryRepository _repository;

        public CategoryService(CategoryRepository repository)
        {
            _repository = repository;
        }


        public async Task<List<Category>> GetCategoryList()
        {
            var list = _repository.GetCategoryList();
            return (list);
        }







    }
}
