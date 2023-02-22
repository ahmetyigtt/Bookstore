using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookStore.Services;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class FavoriteController : ControllerBase
    {

        private readonly FavoriteService _favoriteService;

        public FavoriteController(FavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        [Route("GetFavorites")]
        public async Task<IActionResult> GetFavorites()
        {
            var favoriteList = await _favoriteService.GetFavorites();
            return Ok(favoriteList);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _favoriteService.Delete(id);
            return Ok("Book in favorites deleted");
        }

        [HttpPost]
        [Route("AddToFavorites")]
        public async Task<IActionResult> AddToFavorites(int bookId)
        {

            try
            {
                await _favoriteService.AddToFavorites(bookId);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            return Ok("Book added to favorites");
        }

    }
}