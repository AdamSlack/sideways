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
using SDSA.ViewModels;

namespace SDSA.Controllers
{
    //[Authorize (Roles ="Clinician")]
    public class TestController : Controller
    {
        private readonly IClinicianService _clinicianService;
        private readonly ITestService _testService;
        public TestController (IClinicianService clinRepo, ITestService testServ)
        {
            _clinicianService= clinRepo;
            _testService = testServ;
        }
        [HttpPost]
        public IActionResult DotCancellationResult (int TestId, DotCancellationTest DCT)
        {
            DCT.TestId = TestId;
            if(ModelState.IsValid)
            {
             _testService.SaveDotCancellationTest(DCT);
             return Ok();
            }
            
            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
        [HttpPost]
        public IActionResult CarDirectionResult(int TestId, CarDirectionsTest CDT)
        {
            CDT.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveCarDirectionTest(CDT);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
        [HttpPost]
        public IActionResult TrailMakingTest(int TestId, TrailMakingTest TMT)
        {
            TMT.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveTrailMakingTest(TMT);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
        [HttpPost]
        public IActionResult RoadScenarioResult(int TestId, RoadScenariosTest RST)
        {
            RST.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveRoadScenarioTest(RST);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
        [HttpPost]
        public IActionResult CompassDirectionResult(int TestId, CompassDirectionsTest CDT)
        {
            CDT.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveCompassDirectionsTest(CDT);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
    
        [HttpGet("[controller]/{TestId}/results")]
        public async  Task<IActionResult> TestResults (int TestId)
        {   
            var resusts = new TestResults();
            //TODO write this into repository in single query
            resusts.CarDirectionsTest = await Task.Run( () =>_testService.GetCarDirectionsTest(TestId));
            resusts.CompassDirectionsTest = await Task.Run(() => _testService.GetCompassDirectionsTest(TestId));
            resusts.DotCancellationTest = await Task.Run(() => _testService.GetDotCancellationTest(TestId));
            resusts.TrailMakingTest = await Task.Run(()=> _testService.GetTrailMakingTest(TestId));
            resusts.RoadScenariosTest = await Task.Run(() => _testService.GetRoadScenarioTest(TestId));
            return Json(resusts);
        }
       
    }
}
