using Bookstore.Utils;
using Bookstore.Models.ViewModels;
using Bookstore.Models;

namespace Bookstore.Data
{
    public class BookRepository
    {
        private readonly BookShopContext _dbContext;

        public BookRepository(BookShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<BookVM> GetAllBooks()
        {
            var list = (from c in _dbContext.Categories
                        join b in _dbContext.Books on c.Id equals b.CategoryId
                        select new BookVM
                        {
                            Id = b.Id,
                            Name = b.Name,
                            Category = c.Name,
                            Price = b.Price,
                            Image = b.Image,
                        }).ToList();

            return list;
        }

        public List<BookVM> GetBooksByCategory(int categoryId)
        {
            if (categoryId != 0)
            {
                var list = (from c in _dbContext.Categories
                            join b in _dbContext.Books on c.Id equals b.CategoryId
                            where b.CategoryId == categoryId
                            select new BookVM
                            {
                                Id = b.Id,
                                Name = b.Name,
                                Category = c.Name,
                                Price = b.Price,
                                Image = b.Image,
                            }).ToList();
                return list;
            }
            else
                return GetAllBooks();


        }

        public Book GetBookById(int id)
        {
            return _dbContext.Books.FirstOrDefault(b => b.Id == id);
        }


    }
}
