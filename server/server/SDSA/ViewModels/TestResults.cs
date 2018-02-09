using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models.Tests;
namespace SDSA.Models
{
    public class TestResults
    {
        public DotCancellationTest DotCancellationTest { get; set; }
        public CompassDirectionsTest CompassDirectionsTest { get; set; }
        public CarDirectionsTest CarDirectionsTest { get; set; }
        public RoadScenariosTest RoadScenariosTest { get; set; }
        public TrailMakingTest TrailMakingTest { get; set; }
    }
}
