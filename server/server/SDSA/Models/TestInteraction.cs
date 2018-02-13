using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models
{
    public class TestInteraction
    {
        public int TestId { get; set; }
        public int TestType { get; set; }
        //Json representing the interaction data
        public string Interaction { get; set; }
    }
}
