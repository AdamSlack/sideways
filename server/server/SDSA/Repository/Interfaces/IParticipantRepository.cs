using System.Collections.Generic;
using SDSA.Models;

namespace SDSA.Repository.Interfaces
{
    public interface IParticipantRepository
    {
        IEnumerable<int> GetParticipantTests(int participantId);
        int CreateParticipantTest(ParticipantTest PT);
        int CreateParticipant();

        IEnumerable<int> GetClinicianParticipants(int ClinicianID);
    }
}
