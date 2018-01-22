using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models
{
    public class ParticipantTest
    {
        public int TestId { get; set; }
        public int ParticipantId { get; set; }
        public int ClinicianId { get; set; }

        public string LocalePreset { get; set; }
    }
}
