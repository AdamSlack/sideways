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
//using SDSA.ViewModels;
using Microsoft.Extensions.Logging;
using SDSA.Models.Enums;
using SDSA.Models;

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
        [HttpPost("[controller]/{TestId}/DotCancellationResult")]
        public IActionResult DotCancellationResult (int TestId, [FromBody] DotCancellationTest DCT)
        {
            //requests should already be logged
            //here is an example of how to do extra log messages
            _logger.LogInformation("Dot Cancellation Results Post Request Recieved.");
            Console.WriteLine("Results are: \n FN - " + DCT.falseNeg + "\n FP - " + DCT.falsePos + "\n TP - " + DCT.TruePos);
            DCT.TestId = TestId;
            Console.WriteLine("Request DCT recieved");
            Console.WriteLine("falseneg: " + DCT.falseNeg);
            Console.WriteLine("False Pos:" +  DCT.falsePos);
            Console.WriteLine("True Pos:" + DCT.TruePos);
            Console.WriteLine("Time Taken:"+ DCT.TimeTaken);
            Console.WriteLine("test ID:"+ DCT.TestId);


            if (ModelState.IsValid)
            {
                _testService.SaveDotCancellationTest(DCT);
                return Ok();
            }

            return StatusCode(422, Json(new { message = "Unprocessable entity", errors = ModelState.Values.SelectMany(v => v.Errors) }));
        }


        // EXAMPLE CURL...
        // Nice and Simple.          Set the headers         check body is correct          Check correct URI is used...
        // curl -X POST -H "Content-Type: application/json" -d "{points : 1234}" "localhost:5000/Test/results/Cardirections/1"
        
        [HttpPost("[controller]/results/CarDirections/{TestId}")]
        public IActionResult CarDirectionResult(int TestId, [FromBody] CarDirectionsTest CDT)
        {
            
            _logger.LogInformation("CarDirections Results Post Request Recieved.");
            Console.WriteLine("Results Are : \n Points - " + CDT.points + "\nTime Taken - " + CDT.TimeTaken);
            CDT.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveCarDirectionTest(CDT);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }
        
        [HttpPost("[controller]/{id}/results/trail_making/")]
        public IActionResult TrailMakingTest(int id, [FromBody]  TrailMakingTest TMT)
        {   
            Console.WriteLine("Received Mistakes: "+ TMT.Mistakes);
            Console.WriteLine("Received TimeTaken: "+ TMT.TimeTaken);
            Console.WriteLine("Received Testid: "+ TMT.TestId);

            TMT.TestId = id;
            if (ModelState.IsValid)
            {
                _testService.SaveTrailMakingTest(TMT);
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }

        [HttpPost("[controller]/results/RoadScenarios/{TestId}")]
        public IActionResult RoadScenarioResult(int TestId, [FromBody] RoadScenariosTest RST)
        {
            Console.WriteLine("Results Are : \n Points - " + RST.Points + "\nTime Taken - " + RST.TimeTaken);

            
            RST.TestId = TestId;
            if (ModelState.IsValid)
            {
                _testService.SaveRoadScenarioTest(RST);
                
                return Ok();
            }

            return StatusCode(422, Json(ModelState.Values.SelectMany(v => v.Errors)));
        }

        [HttpPost("[controller]/results/CompassDirections/{TestId}")]
        public IActionResult CompassDirectionResult(int TestId, [FromBody] CompassDirectionsTest CDT)
        {
            Console.WriteLine("Results Are : \n Points - " + CDT.Points + "\nTime Taken - " + CDT.TimeTaken);
            
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

        [HttpGet("[controller]/algorithms")]
        public IActionResult Algorithms() {
            Console.WriteLine("Recieved a request for a list of algorithms");

            IEnumerable<Algorithm> algorithms =  _testService.GetAlgorithms();

            return Json(new {algorithms = algorithms});
        }

        [HttpGet("[controller]/{TestId}/algorithm/{algorithmId}")]
        public IActionResult AlgorithmResult (int TestId , AlgoritmEnum algorithmId) {
            
            Console.WriteLine("Algorithm Results Request Recieved.");
            if( TestId == 0){
                return StatusCode(422, "TestId required");
            }
            else if (algorithmId == 0 ){
                return StatusCode(422, "Algorithm Id required");
            }
            
            Console.WriteLine("Going to try and fetch Algothithm Results now.");
            var result = _testService.GetAlgorithResult(TestId, algorithmId);

            if ( result.error == AlgorithmErrorEnum.MissingAlgorithm){
                return StatusCode(501, result);
            }
            else if (result.error == AlgorithmErrorEnum.MissingData){
                return StatusCode(400, result);
            }

            return Json(result );
        }

        [HttpPost("[Controller]/Interaction/{testID}/{testType}")]
        public IActionResult TestInteraction(int testID, int testType, [FromBody] TestInteraction TI) {
            Console.WriteLine("Recieved Request for inserting interaction logs.");
            Console.WriteLine("TestID: " + testID);
            Console.WriteLine("Test Type:" + testType);
            Console.WriteLine("JSON Dump: " + TI.Interaction);

            _testService.AddInteractionLog(testID, testType, TI);

            return Json(new { Message = "JSON string added to the Database."} );
        }

        [HttpGet("[Controller]/Interaction/{testID}/")]
        public IActionResult GetTestInteraction(int testID) {
            Console.WriteLine("Request recieved for fetching interaction logs.");
            Console.WriteLine("Test ID");
            IEnumerable<TestInteraction> logs = _testService.getTestLogs(testID);
            Console.WriteLine(logs.Count() + " Logs Retrieved.");
            return Json( new { Logs = logs });
        }
    }   
}
