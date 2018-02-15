using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

using SDSA.Models;
using SDSA.Service.Interfaces;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SDSA.Controllers
{
    public class AuthController : Controller
    {
        readonly IClinicianService _clinicianService;
        readonly IConfiguration _configuration;
        public AuthController(IClinicianService clinicianService, IConfiguration configuration)
        {
            _clinicianService = clinicianService;
            _configuration = configuration;
        }
        // GET: /<controller>/
        [Route("/login")]
        public IActionResult Login([FromBody] SDSAUser User)
        {
          /*  Console.WriteLine("Validating User Login");

            Console.WriteLine("User Email: " + User.Email);*/
            

            if (User.UserType == SDSAUser.loginuserType.Clinician && _clinicianService.ValidateClinician(User))
            {
                Console.WriteLine("Processing a valid user: " + User.Email);
                Clinician Clin = _clinicianService.GetClinician(User.Email);
                var claims = new[]
                {
                    new Claim(ClaimTypes.Email , User.Email),
                    new Claim(ClaimTypes.Role , "Clinician"),
               //     new Claim("ID" , Clin.ID.ToString())
                    
                };


                var bytes = Encoding.UTF8.GetBytes(_configuration["JWT:SecurityKey"]);
                var key = new SymmetricSecurityKey(bytes);
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                

                var token = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:issuer"),
                    audience: _configuration.GetValue<string>("JWT:domain"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                
                var token2 = new JwtSecurityToken(new JwtHeader(new SigningCredentials(key, SecurityAlgorithms.HmacSha256)), new JwtPayload(claims));
                var JWTToken= new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new
                {
                    token = JWTToken,
                    clinician_id = Clin.ID //use claim instead
                });
            }
            return StatusCode(401);
        }
    }
}
