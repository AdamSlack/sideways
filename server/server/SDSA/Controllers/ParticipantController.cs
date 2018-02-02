using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SDSA.Service.Interfaces;
using SDSA.Models;
using Microsoft.AspNetCore.Authorization;

namespace SDSA.Controllers
{
    //[Authorize (Roles ="Clinician")]
    public class ParticipantController : Controller
    {
        IParticipantService _participantService;
        ITestService _testService;
        public ParticipantController (IParticipantService particserv, ITestService testService)
        {
            _participantService = particserv;
            _testService = testService;
        }
        [HttpPost("[controller]/Create/")]
        public IActionResult CreateParticipant()
        {
            Console.WriteLine("Request for Participant Creation Recieved.");
            return Json( new { participantId = _participantService.CreateParticipant() });
        }

        [HttpPost("[controller]/Create/Test")]
        public IActionResult CreateParticipantTest( [FromBody] ParticipantTest PT)
        {
            Console.WriteLine("Request for Participant Creation Recieved. " + PT.ParticipantId + " : " + PT.ClinicianId + " : " + PT.LocalePreset);
            return Json( new { testId = _participantService.CreateParticipantTest(PT) });
        }
        

        [HttpGet("[controller]/{ParticipantId}/Tests")]
        public IActionResult ParticipantTests (int ParticipantId)
        {
            Console.WriteLine("Request for tests of participant: " + ParticipantId);
            return Json( new { tests = _participantService.GetParticipantTests(ParticipantId) } );
        }

        [HttpGet("[controller]/clinician/{ClinicianID}")]
        public IActionResult ClinicianParticipants(int ClinicianID) {
            return Json( new { participants = _participantService.GetClinicianParticipants(ClinicianID)} );
        }
        
    }
}
