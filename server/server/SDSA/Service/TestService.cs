﻿using SDSA.Models.Tests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Repository.Interfaces;
using SDSA.Service.Interfaces;
using SDSA.Models;
using SDSA.Models.Enums;
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
        public AlgorithmResult GetAlgorithResult (int testId, AlgoritmEnum algorithmId)
        {
             var TR = _testRepository.GetAlgorithmResult(testId, algorithmId);
            if (TR != null )
            {
                return TR;
            }
            var testResult = new TestResults() {
                CarDirectionsTest = this.GetCarDirectionsTest(testId),
                CompassDirectionsTest = this.GetCompassDirectionsTest(testId),
                DotCancellationTest = this.GetDotCancellationTest(testId),
                RoadScenariosTest = this.GetRoadScenarioTest(testId),
                TrailMakingTest = this.GetTrailMakingTest(testId)
            };

            var algor = AlgorithmFactory.GetInstance(algorithmId);
            if (algor == null)
                return new AlgorithmResult
                {
                    error = AlgorithmErrorEnum.MissingAlgorithm,
                    Message = $"Could not find algorithm {algorithmId}"
                };

           var result = algor .Calulate(testResult);
            if(result.error != 0)
            {
                _testRepository.SaveAlgorithmReult(result);
            }
            return result;
        }

        
    }
}
