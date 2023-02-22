using Bookstore.Data;
using Bookstore.Models;
using Bookstore.Models.ViewModels;

namespace Bookstore.Services
{
    public class CartService
    {
        private readonly CartRepository _cartRepository;
        private readonly BookRepository _bookRepository;

        public CartService(CartRepository cartRepository, BookRepository bookRepository)
        {
            _cartRepository = cartRepository;
            _bookRepository = bookRepository;
        }

        public async Task<List<CartVM>> GetCartList()
        {
            return _cartRepository.GetCartList();
        }


        public async Task AddToCart(int bookId)
        {
            var book = _cartRepository.GetCartItem(bookId);
            if (book == null)
            {
                var existingBook = _bookRepository.GetBookById(bookId);

                var cartItem = new Cart
                {
                    BookId = bookId,
                    Quantity = 1,
                    TotalPrice = existingBook.Price
                };
                _cartRepository.Add(cartItem);

            }
            else
            {
                throw new InvalidOperationException("This book already in your cart");

            }
        }

        public async Task Delete(int bookId)
        {
            _cartRepository.Delete(bookId);
        }



        public async Task UpdateQuantity(CartVM cartVM)
        {
            _cartRepository.UpdateQuantity(cartVM);
        }
    }
}
