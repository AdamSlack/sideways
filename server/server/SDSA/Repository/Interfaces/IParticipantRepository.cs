using System.Collections.Generic;
using SDSA.Models;

namespace SDSA.Repository.Interfaces
{
    public interface IParticipantRepository
    {
        IEnumerable<int> GetParticipantTests(int participantId);
        int CreateParticipantTest(int PID, int CID, string PresetName);
        int SaveParticipant(Participant p);
    }
}
