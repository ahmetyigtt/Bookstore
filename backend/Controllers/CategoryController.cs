using Bookstore.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet]
        [Route("GetCategoryList")]
        public async Task<IActionResult> GetCategoryList()
        {
            var categories = await _categoryService.GetCategoryList();

            return Ok(categories);

        }



    }
}