
using Bookstore.Models;
using Bookstore.Models.ViewModels;
using Bookstore.Utils;

namespace Bookstore.Data;

public class CartRepository
{

    private readonly BookShopContext _dbContext;
    public CartRepository(BookShopContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<CartVM> GetCartList()
    {
        var cartList = (from b in _dbContext.Books
                        join c in _dbContext.Carts on b.Id equals c.BookId
                        select new CartVM
                        {
                            Id = b.Id,
                            Name = b.Name,
                            Image = b.Image,
                            Quantity = c.Quantity,
                            Price = b.Price

                        }).ToList();

        return cartList;
    }

    public Cart GetCartItem(int bookId)
    {
        return _dbContext.Carts.FirstOrDefault(c => c.BookId == bookId);
    }

    public void Add(Cart cartItem)
    {
        _dbContext.Carts.Add(cartItem);
        _dbContext.SaveChanges();
    }


    public void Delete(int bookId)
    {
        var cartItem = _dbContext.Carts.FirstOrDefault(c => c.BookId == bookId);

        _dbContext.Carts.Remove(cartItem);
        _dbContext.SaveChanges();

    }

    public void UpdateQuantity(CartVM cartVM)
    {
        var cartItem = _dbContext.Carts.FirstOrDefault(c => c.BookId == cartVM.Id);

        if (cartItem != null)
        {
            cartItem.Quantity = cartVM.Quantity;
            cartItem.TotalPrice = cartVM.Quantity * cartVM.Price;

            _dbContext.SaveChanges();
        }
    }

    public List<Cart> GetCartItemList()
    {
        return _dbContext.Carts.ToList();
    }





}