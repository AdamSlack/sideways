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
        

        // EXAMPLE CURL...
        // Nice and Simple.          Set the headers         check body is correct          Check correct URI is used...
        // curl -X POST -H "Content-Type: application/json" -d "{points : 1234}" "localhost:5000/Test/results/Cardirections/1"

        [HttpPost("[controller]/results/DotCancellation/{TestId}")]
        public IActionResult DotCancellationResult (int TestId, [FromBody] DotCancellationTest DCT)
        {
            //requests should already be logged
            //here is an example of how to do extra log messages
            _logger.LogInformation("Dot Cancellation Results Post Request Recieved.");
            Console.WriteLine("Results are: \n FN - " + DCT.falseNeg + "\n FP - " + DCT.falsePos + "\n TP - " + DCT.TruePos);
            DCT.TestId = TestId;
            // if(ModelState.IsValid)
            // {
            //  _testService.SaveDotCancellationTest(DCT);
            //  return Ok();
            // }
           
            return Ok();//StatusCode(422, Json(new { message = "Unprocessable entity", errors = ModelState.Values.SelectMany(v => v.Errors) }));
        }


        // EXAMPLE CURL...
        // Nice and Simple.          Set the headers         check body is correct          Check correct URI is used...
        // curl -X POST -H "Content-Type: application/json" -d "{points : 1234}" "localhost:5000/Test/results/Cardirections/1"
        
        [HttpPost("[controller]/results/CarDirections/{TestId}")]
        public IActionResult CarDirectionResult(int TestId, [FromBody] CarDirectionsTest CDT)
        {
            
            _logger.LogInformation("Dot Cancellation Results Post Request Recieved.");
            Console.WriteLine("Results Are : \n Points - " + CDT.points + "\nTime Taken - " + CDT.TimeTaken);
            CDT.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveCarDirectionTest(CDT);
                return Ok();
            }

            return Ok();//StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
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
