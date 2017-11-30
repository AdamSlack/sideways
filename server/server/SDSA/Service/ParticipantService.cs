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
        public IEnumerable<int> GetParticipantTests(int participantId)
        => _participantRepository.GetParticipantTests(participantId);

        public int SaveParticipant(Participant p)
        => _participantRepository.SaveParticipant(p);
    }
}
