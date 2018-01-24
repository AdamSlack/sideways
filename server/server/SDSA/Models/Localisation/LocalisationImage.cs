using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class LocalisationImage {
        public int      imageId     { get; set; }
        public string   PresetName  { get; set; }
        public string   ImageName   { get; set; }
        public string   FileType    { get; set; }
        public string   description { get; set; }
    }
}
