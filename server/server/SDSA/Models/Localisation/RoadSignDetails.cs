using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class RoadSignDetails {
        public GeneralTestDetails GeneralDetails { get; set; }
        public string DeckLagel { get; set; }
        public RoadSignScenario[] RoadSignScenarios { get; set; }
    }
}
