using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class RoadSignScenarioDetails {
        public GeneralTestDetails GeneralDetails { get; set; }
        public string DeckLabel { get; set; }
        public RoadSignScenario[] RoadSignScenarios { get; set; }
    }
}
