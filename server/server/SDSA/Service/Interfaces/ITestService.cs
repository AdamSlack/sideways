using SDSA.Models;
using SDSA.Models.Tests;
using System.Collections.Generic;

namespace SDSA.Service.Interfaces
{
    public interface ITestService : SDSA.Repository.Interfaces.ITestRepository
    {
        //@omg i'm all for interfacses but not like this. This is stupid a interface that is just hte 
        //same as ITestRepository ... just silly. Even if you have extra functionaility fucking like inject
        // i understand this is stupid to have in the service but unless good use is used for it there no point.
        // Design patterns are not suppose to be used because a text book says.
        // As a side not i hate lenghtly namespaces
        // int SavePatricipantTest(ParticipantTest PT);
        // IEnumerable<ParticipantTest> GetParticipantsTests(int participantid);
        // ParticipantTest GetParticipantsTest(int testId);
        // CarDirectionsTest GetCarDirectionsTest(int TestId);
        // CompassDirectionsTest GetCompassDirectionsTest(int TestId);
        // RoadScenariosTest GetRoadScenarioTest(int TestId);
        // TrailMakingTest GetTrailMakingTest(int TestId);
        // DotCancellationTest GetDotCancellationTest(int TestId);

        // void SaveCarDirectionTest(CarDirectionsTest CDT);
        // void SaveCompassDirectionsTest(CompassDirectionsTest CDT);
        // void SaveDotCancellationTest(DotCancellationTest DCT);
        // void SaveRoadScenarioTest(RoadScenariosTest RST);
        // void SaveTrailMakingTest(TrailMakingTest TMT);
        // string GetParticipantTestPresetName(int testID);


        string whatislife();
    }
}