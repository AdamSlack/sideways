using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class LocalePreset {
        public string Name { get; set; }
        public DotCancellationDetails DotCancellation { get; set; }
        public CompassDirectionDetails CompassDirection { get; set; }
        public CarDirectionDetails CarDirection { get; set; }
        public RoadSignScenarioDetails RoadSign { get; set; }
        public TrailMakingDetails TrailMaking { get; set; }
    }
}
