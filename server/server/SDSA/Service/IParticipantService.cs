using SDSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Service.Interfaces
{
    interface IParticipantService
    {
        IEnumerable<int> GetParticipantTests(int participantId);
        int SaveParticipant(Participant p);
    }
}
