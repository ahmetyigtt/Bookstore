using Bookstore.Models;
using Bookstore.Models.ViewModels;
using BookStore.Data;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Services
{
    public class FavoriteService
    {

        private readonly FavoriteRepository _favoriteRepository;

        public FavoriteService(FavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }

        public async Task<List<FavoriteVM>> GetFavorites()
        {
            return await _favoriteRepository.GetFavoriteList();
        }

        public async Task Delete(int bookId)
        {
            await _favoriteRepository.Delete(bookId);
        }

        public async Task AddToFavorites(int bookId)
        {
            var existingFavoriteItem = await _favoriteRepository.GetBook(bookId);

            if (existingFavoriteItem != null)
            {
                throw new InvalidOperationException("Book already added to favorites");

            }
            else
            {
                var book = new Favorite
                {
                    BookId = bookId
                };
                await _favoriteRepository.Add(book);
            }

        }

    }
}