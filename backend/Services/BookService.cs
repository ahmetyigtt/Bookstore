using Bookstore.Data;
using Bookstore.Models;
using Bookstore.Models.ViewModels;

namespace Bookstore.Services
{
    public class BookService
    {

        private readonly BookRepository _bookRepository;

        public BookService(BookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<List<BookVM>> GetAllBooks()
        {
            return  _bookRepository.GetAllBooks();
        }

        public async Task<List<BookVM>> GetBooksByCategory(int categoryId)
        {
            return _bookRepository.GetBooksByCategory(categoryId);
        }





    }
}
