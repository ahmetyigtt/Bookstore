using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bookstore.Models;
using Bookstore.Models.ViewModels;
using Bookstore.Utils;
using Microsoft.EntityFrameworkCore;


namespace BookStore.Data
{
    public class FavoriteRepository
    {

        private readonly BookShopContext _dbContext;

        public FavoriteRepository(BookShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<FavoriteVM>> GetFavoriteList()
        {
            var favoriteList = (from b in _dbContext.Books
                                join f in _dbContext.Favorites on b.Id equals f.BookId
                                select new FavoriteVM
                                {
                                    Id = b.Id,
                                    Name = b.Name,
                                    Image = b.Image,
                                    Price = b.Price

                                }).ToList();

            return favoriteList;
        }

        public async Task<Favorite> GetBook(int bookId)
        {
            var existingFavoriteItem = _dbContext.Favorites.FirstOrDefault(b => b.BookId == bookId);
            return existingFavoriteItem;
        }

        public async Task Add(Favorite book)
        {
            _dbContext.Favorites.Add(book);
            _dbContext.SaveChanges();
        }


        public async Task Delete(int bookId)
        {
            var existingFavoriteItem = _dbContext.Favorites.FirstOrDefault(b => b.BookId == bookId);

            _dbContext.Favorites.Remove(existingFavoriteItem);
            _dbContext.SaveChanges();

        }

    }
}