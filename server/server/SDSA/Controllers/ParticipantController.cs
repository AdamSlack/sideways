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
    [Authorize (Roles ="Clinician")]
    public class ParticipantController : Controller
    {
        IParticipantService _participantService;
        ITestService _testService;
        public ParticipantController (IParticipantService particserv, ITestService testService)
        {
            _participantService = particserv;
            _testService = testService;
        }
        [HttpPost("[controller]/Create)")]
        public IActionResult Create(Participant participant)
        {

             return Json( new { participantId = _participantService.SaveParticipant(participant) });
        }
        [HttpGet("[controller]/{ParticipantId}/Tests")]
        public IActionResult Tests (int ParticipantId)
        {
           
            return Json(_testService.GetParticipantsTests(ParticipantId));
        }
    }
}