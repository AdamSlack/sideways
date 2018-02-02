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
using Microsoft.Extensions.Logging;

namespace SDSA.Controllers
{
    //[Authorize (Roles ="Clinician")]

    //route Test/[actionName]  
    //e.g. POST test/DotCancellationResult
    public class TestController : Controller
    {
        private readonly IClinicianService _clinicianService;
        private readonly ITestService _testService;
        private readonly ILogger<TestController> _logger;
        public TestController (IClinicianService clinRepo, ITestService testServ, ILogger<TestController> logger)
        {
            _clinicianService= clinRepo;
            _testService = testServ;
            _logger = logger;
        }
        [HttpPost]
        public IActionResult DotCancellationResult (int TestId, DotCancellationTest DCT)
        {
            //requests should already be logged
            //here is an example of how to do extra log messages
            _logger.LogInformation("Some message that is usefull");
            DCT.TestId = TestId;
            if(ModelState.IsValid)
            {
             _testService.SaveDotCancellationTest(DCT);
             return Ok();
            }
           
            return StatusCode(422, Json(new { message = "Unprocessable entity", errors = ModelState.Values.SelectMany(v => v.Errors) }));
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
        
        [HttpPost("[controller]/{id}/results/trail_making/")]
        public IActionResult TrailMakingTest(int TestId, [FromBody]  TrailMakingTest TMT)
        {   
            Console.WriteLine("Received Mistakes: ", TMT.Mistakes);
            Console.WriteLine("Received TimeTaken: ", TMT.TimeTaken);
            Console.WriteLine("Received Testid: ", TMT.TestId);

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

        [HttpGet("[controller]/participant/{testID}")]
        public IActionResult TestPreset(int testID) 
            => Json( new { PresetName = _testService.GetParticipantTestPresetName(testID)});   

        [HttpGet()]
        public IActionResult whatislife() {
            Console.WriteLine("whatislife");
            var results = new { whatislife = "whatislife"};
            return Json(results);
        }
       
    }
}
