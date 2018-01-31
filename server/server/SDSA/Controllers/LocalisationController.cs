using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using SDSA.Service.Interfaces;
using SDSA.Models;
using SDSA.Models.Localisation;
using System.IO;

namespace SDSA.Controllers
{
    public class LocalisationController : Controller
    {
        ILocalisationService _localisationService;
        public LocalisationController (ILocalisationService localserv)
        {
            _localisationService = localserv;
        }


        [HttpGet("[controller]/image/{ImageId}")]
        public IActionResult Image(int ImageId)
        {
            var image = _localisationService.GetImage(ImageId);

            return NoContent(); //(image == null ? (IActionResult)File(image.Image, image.FileType) : (IActionResult)NotFound("Image not found"));
        }


        [HttpGet("[controller]/{LocalisationId}/image/{ImageName}")]
        public IActionResult Image(int LocalisationId, string ImageName)
        {
            var image = _localisationService.GetImage(LocalisationId, ImageName);

            return NoContent(); //(image == null ? (IActionResult)File(image.Image, image.FileType) : (IActionResult)NotFound("Image not found"));
        }


        // [HttpPost("[controller]/{LocalisationId}/image/{ImageName}")]
        // public IActionResult Image (string LocalisationId, string ImageName , [FromBody] LocalisationImage LI)
        // {
        //     if (LocalisationId == "")
        //         return StatusCode(422, "Localisation Id required");
        //     else if (string.IsNullOrWhiteSpace(ImageName))
        //         return StatusCode(422, "Image name required");
        //     else if (LI == null || LI.Image.Length == 0)
        //         return StatusCode(422, "Image required");


        //     using (var stream = new MemoryStream())
        //     {
        //         Image.CopyTo(stream);
        //         img.Image = stream.ToArray();
        //     };

        //     _localisationService.SaveImage(img);
        //     return Json();
        // }


        [HttpGet("[controller]/{LocalisationId}/image/list")]
        public IActionResult ImageList (int LocalisationId)
        {
            if(LocalisationId == 0)
            {
                return StatusCode(422, "LocalisationId required");
            }
            var list = _localisationService.GetImageIdAndNameByLocalisationid(LocalisationId);
            return Json(list);
        }


        [HttpGet("[controller]/{LocaleName}/{TestType}")]
        public IActionResult Testdetails(string LocaleName, int TestType) {
            Console.WriteLine("Requst for Local Prest Details Recieved");
            Console.WriteLine("Fetching Presets for Locale: " + LocaleName + ". Test retrieving: " + TestType);

            TestLocaleDetails deets = _localisationService.FetchTestLocalisationPreset(LocaleName, TestType);

            return Json(deets);
        }

        [HttpPost("[controller]/{LocaleName}/{TestType}")]
        public IActionResult TestDetails(string LocaleName, int TestType,[FromBody] TestLocaleDetails Details) {
            
            Console.WriteLine("Posting of Locale Preset Recieved: " + LocaleName + ". Of Type: " + TestType);
            Console.WriteLine("Details of Recieved Locale Preset are:");
            Console.WriteLine("Type:" + Details.Type);
            Console.WriteLine("Name:" + Details.Name);
            Console.WriteLine("Instructions:" + Details.Instructions);
            Console.WriteLine("Other details not being logged...");

            _localisationService.SaveTestDetails(LocaleName, TestType, Details);

            return Ok();
        }

        [HttpPost("[controller]/{LocaleName}/RoadSignScenario")]
        public IActionResult RoadSignScenario(string LocaleName, [FromBody] RoadSignScenario RSS) {
            Console.WriteLine("Recieved Request to save road sign scenario.");
            _localisationService.SaveRoadSignScenario(LocaleName, RSS);
            return Ok();
        }
        
        [HttpGet("[controller]/{LocaleName}/RoadSignScenario/{id}")]
        public IActionResult SelectRoadSignScenario(string LocaleName, int id) {
            Console.WriteLine("get request for Road Sign Scenario No: " + id + " from preset: " + LocaleName);
            return Json(_localisationService.SelectRoadSignScenario(id));
        }

        [HttpGet("[controller]")]
        public IActionResult LocaleOptions() {
            Console.WriteLine("Request for Locale Names recieved");
            return Json( new { LocaleNames = _localisationService.GetLocaleNames()});
        }
    }
}
