using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SDSA.Repository.Interfaces;
using SDSA.Service.Interfaces;
using SDSA.Models.Tests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace SDSA.Controllers
{
    public class TestController : Controller
    {
        private readonly IClinicianService _clinicianService;
        public TestController (IClinicianService clinRepo)
        {
            _clinicianService= clinRepo;
        }
     
        [HttpGet]
        public IActionResult Index(int j)
        {
            return Json(_clinicianService.GetAllClinicians());
        }
        
        [HttpPost]
        public IActionResult Index( DotCancellationTest DCT)
        {
            return Json(_clinicianService.GetAllClinicians());
        }
       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        public IActionResult authorized ()
        {
            return (Json("Welcome authorized user"));
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
