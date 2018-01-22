using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation {
    public class LocalePreset {
        public string Name { get; set; }
        public TestLocaleDetails DotCancellation { get; set; }
        public TestLocaleDetails CompassDirection { get; set; }
        public TestLocaleDetails CarDirection { get; set; }
        public TestLocaleDetails RoadSign { get; set; }
        public TestLocaleDetails TrailMaking { get; set; }
    }
}
