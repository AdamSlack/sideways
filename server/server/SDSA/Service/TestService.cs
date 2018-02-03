using SDSA.Models.Tests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Repository.Interfaces;
using SDSA.Service.Interfaces;
using SDSA.Models;

namespace SDSA.Service
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;
        public TestService (ITestRepository testRepo)
        {
            _testRepository = testRepo;
        }
        public CarDirectionsTest GetCarDirectionsTest(int TestId)
            => _testRepository.GetCarDirectionsTest(TestId);
        public CompassDirectionsTest GetCompassDirectionsTest(int TestId)
            => _testRepository.GetCompassDirectionsTest(TestId);
        public RoadScenariosTest GetRoadScenarioTest(int TestId)
            => _testRepository.GetRoadScenarioTest(TestId);
        public TrailMakingTest GetTrailMakingTest(int TestId)
            => _testRepository.GetTrailMakingTest(TestId);
        public DotCancellationTest GetDotCancellationTest(int TestId)
            => _testRepository.GetDotCancellationTest(TestId);
        public void SaveCarDirectionTest(CarDirectionsTest CDT)
            => _testRepository.SaveCarDirectionTest(CDT);
        public void SaveCompassDirectionsTest(CompassDirectionsTest CDT)
            => _testRepository.SaveCompassDirectionsTest(CDT);
        public void SaveDotCancellationTest(DotCancellationTest DCT)
            => _testRepository.SaveDotCancellationTest(DCT);

        public void SaveDotCancellationInteractionLogs(SDSA.Models.TestInteraction DCTTI)
           => _testRepository.SaveDotCancellationInteractionLogs(DCTTI);
       

        public void SaveRoadScenarioTest(RoadScenariosTest RST)
            => _testRepository.SaveRoadScenarioTest(RST);
        public void SaveTrailMakingTest(TrailMakingTest TMT)
            => _testRepository.SaveTrailMakingTest(TMT);
        public int SavePatricipantTest(ParticipantTest PT)
            => _testRepository.SavePatricipantTest(PT);
        public IEnumerable<ParticipantTest> GetParticipantsTests(int participantid)
            => _testRepository.GetParticipantsTests(participantid);
        public ParticipantTest GetParticipantsTest(int testId)
            => _testRepository.GetParticipantsTest(testId);
        public string GetParticipantTestPresetName(int testID)
            => _testRepository.GetParticipantTestPresetName(testID);
        public string whatislife() => "whatislife";
        
    }
}
