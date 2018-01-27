using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation
{
    public class TestLocaleDetails
    {
        public string Type { get; set;}
        public string Name { get; set;}
        public string Instructions { get; set; }

        public string HeadingsLabel { get; set; }

        public string DeckLabel { get; set; }
    
        public string[] TrailA { get; set; }
        public string[] TrailB { get; set; }

        public RoadSignScenario[] RoadSignScenarios { get; set; }
    }
}
