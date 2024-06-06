using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using ProjServiSysApi.Extensions;
using ProjServiSys.Application.Dto;
using ProjServiSys.Application.Contratos;



namespace ProjServiSysApi.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        public AccountController(IAccountService accountService, ITokenService tokenInterface)
        {
            _accountService = accountService;
            _tokenService = tokenInterface;       
        }

        [HttpGet("GetUser")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser(string username)
        {
            try
            {
                var userName = User.GetUserName();
                var user = await _accountService.GetUserByUsernameAsync(username);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("RegisterUser")]
        //[Authorize(Policy = "AdminPolicy")]
         [AllowAnonymous]
        public async Task<IActionResult> RegisterUser(UserDto userDto)
        {
            try
            {
                if (await _accountService.UserExists(userDto.Username))
                    return BadRequest("Usuário já existe");

                var user = await _accountService.CreateAccountAsync(userDto);
                if (user != null) return Ok(user);

                return BadRequest("Usuário não criado, tente novamente");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar registrar usuário. Erro: {ex.Message}");
            }
        }


        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginUser(UserLoginDto userLogin)
        {
            try
            {
                var user = await _accountService.GetUserByUsernameAsync(userLogin.username);
                if (user == null) return Unauthorized("Usuário ou senha incorreto!");

                var result = await _accountService.CheckUserPasswordAsync(user, userLogin.password);
                if(!result.Succeeded) return Unauthorized();

                return Ok(new
                {
                    userName = user.Username,
                    primeiroNome = user.PrimeiroNome,
                    token = _tokenService.CreateToken(user).Result
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar logar usuário. Erro: {ex.Message}");
            }
        }

        [HttpPut("UpdateUser")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await _accountService.GetUserByUsernameAsync(User.GetUserName());
                if (user == null) return Unauthorized("Usuário inválido!");

                var userReturn = await _accountService.UpdateAccount(userUpdateDto);
                if (userReturn == null) return NoContent();

                return Ok(userReturn);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
            }
        }
    }
}