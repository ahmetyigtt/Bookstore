using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bookstore.Services;
using Bookstore.Models;
using Bookstore.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginVM userLoginVM)
        {

            try
            {
                var user = await _accountService.Login(userLoginVM);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserRegisterVM userRegisterVM)
        {

            try
            {
                await _accountService.Register(userRegisterVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("Account created successfully");

        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {

            try
            {
                await _accountService.Logout();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("Log outed successfully");

        }

        [HttpGet]
        [Route("GetUserInfo")]
        public async Task<IActionResult> GetUserInfo(String email)
        {
            UserInfoVM user;
            try
            {
                user = await _accountService.GetUserByEmail(email);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(user);

        }

    }
}