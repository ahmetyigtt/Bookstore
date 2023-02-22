
using Microsoft.AspNetCore.Mvc;
using Bookstore.Models;
using Bookstore.Services;
using Bookstore.Models.ViewModels;

namespace Bookstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }


        [HttpGet]
        [Route("GetCartList")]
        public async Task<IActionResult> GetCartList()
        {
            try
            {
                var cartList = await _cartService.GetCartList();
                return Ok(cartList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddToCart")]
        public async Task<IActionResult> AddToCart(int bookId)
        {
            try
            {
                await _cartService.AddToCart(bookId);
                return Ok("Book added to cart");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cartService.Delete(id);
            return Ok("Book deleted from cart");

        }


        [HttpPut]
        [Route("UpdateQuantity")]
        public async Task<IActionResult> UpdateQuantity(CartVM cartVM)
        {
            try
            {
                await _cartService.UpdateQuantity(cartVM);
                return Ok("CarItem updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
