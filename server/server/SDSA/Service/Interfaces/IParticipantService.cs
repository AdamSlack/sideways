using SDSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Service.Interfaces
{
    public interface IParticipantService
    {
        IEnumerable<int> GetParticipantTests(int participantId);
        
        int CreateParticipantTest(int PID, int CID, string PresetName);
        int SaveParticipant(Participant p);
    }
}
