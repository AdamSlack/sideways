using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation
{
    public class LocalisationImage
    {
        public int imageId { get; set; }
        public int presetid {get;set;}
        public string ImageName { get; set; }
        public byte[] Image { get; set; }
        public string FileTpye { get; set; }
        public string description { get; set; }
    }
}
