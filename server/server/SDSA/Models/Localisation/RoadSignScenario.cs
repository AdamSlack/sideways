using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation
{
    public class RoadSignScenario
    {
        public int      id          { get; set; }
        public string   presetName  { get; set; }
        public byte[]   SceneImage  { get; set; }
        public byte[]   SignImage   { get; set; }
        public int      xPos        { get; set; }
        public int      yPos        { get; set; }
    }
}
