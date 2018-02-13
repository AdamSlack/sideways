using SDSA.Models;
using SDSA.Models.Tests;
using System.Collections.Generic;
using SDSA.Models.Enums;
namespace SDSA.Repository.Interfaces
{
    public interface ITestRepository
    {
        CarDirectionsTest GetCarDirectionsTest(int TestId);
        CompassDirectionsTest GetCompassDirectionsTest(int TestId);
        RoadScenariosTest GetRoadScenarioTest(int TestId);
        TrailMakingTest GetTrailMakingTest(int TestId);
        DotCancellationTest GetDotCancellationTest(int TestId);

        void SaveCarDirectionTest(CarDirectionsTest CDT);
        void SaveCompassDirectionsTest(CompassDirectionsTest CDT);
        void SaveDotCancellationTest(DotCancellationTest DCT);
        void SaveRoadScenarioTest(RoadScenariosTest RST);
        void SaveTrailMakingTest(TrailMakingTest TMT);


        //@dpericated why have participant interface if it's just going have to have this here...
        int SavePatricipantTest(ParticipantTest PT);
        ParticipantTest GetParticipantsTest(int testId);

        //Need this call whenshould be in the participant 
        IEnumerable<ParticipantTest> GetParticipantsTests(int participantid);

        
        string GetParticipantTestPresetName(int testID);

        AlgorithmResult GetAlgorithmResult(int testId, AlgoritmEnum algorithmId, bool getComponents = true);
        void SaveAlgorithmReult(AlgorithmResult result);
        IEnumerable<Algorithm> GetAlgorithms();
        void AddInteractionLog(int testID, int testType, TestInteraction TI);
        IEnumerable<TestInteraction> getTestLogs(int testID);

    }
}
