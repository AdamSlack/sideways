using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SDSA.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using SDSA.Models;
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

            return (image == null ? (IActionResult)File(image.Image, image.FileTpye) : (IActionResult)NotFound("Image not found"));
        }
        [HttpGet("[controller]/{LocalisationId}/image/{ImageName}")]
        public IActionResult Image(int LocalisationId, string ImageName)
        {
            var image = _localisationService.GetImage(LocalisationId, ImageName);

            return (image == null ? (IActionResult)File(image.Image, image.FileTpye) : (IActionResult)NotFound("Image not found"));
        }
        [HttpPost("[controller]/{LocalisationId}/image/{ImageName}")]
        public IActionResult Image (int LocalisationId,string ImageName , IFormFile Image, string description)
        {
            if (LocalisationId == 0)
                return StatusCode(422, "Localisation Id required");
            else if (string.IsNullOrWhiteSpace(ImageName))
                return StatusCode(422, "Image name required");
            else if (Image == null || Image.Length == 0)
                return StatusCode(422, "Image required");

            var img = new LocalisationImage
            {
                description = description,
                ImageName = ImageName,
                FileTpye = Image.ContentType
            };
            using (var stream = new MemoryStream())
            {
               
                Image.CopyTo(stream);
                img.Image = stream.ToArray();
            }
            _localisationService.SaveImage(img);
            return Ok();
        }
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
    }
}