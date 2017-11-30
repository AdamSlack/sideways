﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SDSA.Repository.Interfaces;
namespace SDSA.Controllers
{
    public class TestController : Controller
    {
        private readonly IClinicianRepository _clinicianRepository;
        public TestController (IClinicianRepository clinRepo)
        {
            _clinicianRepository = clinRepo;
        }
     
        public IActionResult Index(int j)
        {

            return Json(_clinicianRepository.GetAllClinicians());
        }
       
        

        public IActionResult Error()
        {
            return View();
        }
    }
}