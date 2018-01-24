using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation
{
    public class RoadSignScenario
    {
        public int      id              { get; set; }
        public string   presetName      { get; set; }
        public string   SceneImage      { get; set; }
        public string   SignImage       { get; set; }
        public string   SceneFileType   { get; set ;}
        public string   SignFileType    { get; set ;}
        public int      xPos            { get; set; }
        public int      yPos            { get; set; }
    }
}
