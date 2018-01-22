using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class RoadSignScenario {
        public string RoadSignName { get; set; }
        public string RoadScenarioName { get; set; }
        
        public LocalisationImage RoadSignImage { get; set; }
        public LocalisationImage RoadScenarioImge { get; set; }

        public RoadSignCoordinates RoadSignCoordinates { get; set; }
    }
}
