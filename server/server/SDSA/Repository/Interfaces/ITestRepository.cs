using SDSA.Models;
using SDSA.Models.Tests;
using System.Collections.Generic;

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
        int SavePatricipantTest(ParticipantTest PT);
        IEnumerable<ParticipantTest> GetParticipantsTests(int participantid);
        ParticipantTest GetParticipantsTest(int testId);
    }
}