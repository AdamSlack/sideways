using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using SDSA.Service.Interfaces;
using SDSA.Repository.Interfaces;
namespace SDSA.Service
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _participantRepository;
        public ParticipantService(IParticipantRepository participantRepo)
        {
            _participantRepository = participantRepo;
        }

        public int CreateParticipantTest(ParticipantTest PT) 
            => _participantRepository.CreateParticipantTest(PT);
        
        public IEnumerable<int> GetParticipantTests(int participantId)
            => _participantRepository.GetParticipantTests(participantId);

        public int CreateParticipant()
            => _participantRepository.CreateParticipant();
    
        public IEnumerable<int> GetClinicianParticipants(int ClinicianID)
            => _participantRepository.GetClinicianParticipants(ClinicianID);

    }
}
