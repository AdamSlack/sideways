using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models.Tests;
using Microsoft.Extensions.Configuration;
using System.Data;
using Dapper;
using SDSA.Repository.Interfaces;
using SDSA.Models;

namespace SDSA.Repository
{
    public class TestRepository : ITestRepository
    {
        private readonly IDbConnection db;
        public TestRepository(IConfiguration config)
        {
            db = DBFactory.getConnection(config);
        }
        #region participantTest
        public int SavePatricipantTest(ParticipantTest PT)
        => db.ExecuteScalar<int>(
            "insert into participant_test (test_id, participant_id , clinician_id) " +
            "Values (DEFAULT,@ParticipentId, @ClinicianId) " +
            "returning test_id",
            PT
            );
        public IEnumerable<ParticipantTest> GetParticipantsTests(int participantid)
        => db.Query<ParticipantTest>(
            "select test_id as TestId," +
            "participant_id as ParticipantId," +
            "clinician_id as ClinicianId" +
            "from participant_tests " +
            "where participant_id = @participantId",
            new { participantId = participantid }

            );
        public ParticipantTest GetParticipantsTest(int testId)
        => db.ExecuteScalar<ParticipantTest>(
            "select test_id as TestId, " +
            "participant_id as ParticipantId, " +
            "clinician_id as ClinicianId " +
            "from participant_tests " +
            "where test_id = @TestId",
            new { TestId = testId }

            );
        #endregion
        #region DCT
        public void SaveDotCancellationTest(DotCancellationTest DCT)
        {
            db.Execute(
                "Insert into dot_cancellation (test_id, time_taken, true_pos, false_pos, false_neg, test_date)" +
                "Values(@TestId , @TimeTaken, @TruePos , @FalsePos, @FalseNeg, NOW())",
                DCT
                );
        }

        public DotCancellationTest GetDotCancellationTest(int TestId)
             => db.ExecuteScalar<DotCancellationTest>(
                "Select Test_Id as TestId ," +
                " time_taken as TimeTaken, " +
                "true_pos as TruePos," +
                "false_pos as FalsePos," +
                "false_neg as FalseNeg " +
                "from dot_cancellation "  +
                "where test_id = @TestId",

                new { TestId = TestId }

                );
        #endregion
        #region CaDT
        public CarDirectionsTest GetCarDirectionsTest(int TestId)
            => db.ExecuteScalar<CarDirectionsTest>(
                "Select test_id as TestId ," +
                "time_taken as TimeTaken ," +
                "points as Points " +
                "from car_directions " +
                "where test_id = @TestId"
                ,
                new { TestId = TestId }
                );
        public void SaveCarDirectionTest(CarDirectionsTest CDT)
            => db.Execute(
                "insert into car_directions (test_Id , time_taken, points)" +
                "Values (@TestId , @TimeTaken, @Points)",
                CDT
                );
        #endregion
        #region CoDT
        public CompassDirectionsTest GetCompassDirectionsTest(int TestId)
            => db.ExecuteScalar<CompassDirectionsTest>(
                "Select test_id as TestId," +
                "time_taken as Time_Taken," +
                "points as Points " +
                "from compass_directions " +
                "where test_id = @TestId",
                new { TestId = TestId }
                );
        public void SaveCompassDirectionsTest(CompassDirectionsTest CDT)
            => db.Execute(
                "insert into compass_directions (test_Id , time_taken, points) " +
                "Values (@TestId , @TimeTaken, @Points)",
                CDT
                );
        #endregion
        #region RST
        public RoadScenariosTest GetRoadScenarioTest(int TestId)
            => db.ExecuteScalar<RoadScenariosTest>
            (
                 "Select test_id as TestId," +
                "time_take as Time_Taken," +
                "points as Points " +
                "from road_scenarios " +
                "where test_id = @TestId ",
                new { TestId = TestId }
                );
        public void SaveRoadScenarioTest(RoadScenariosTest RST)
            => db.Execute(
                "insert into road_Scenarios (test_Id , time_taken, points) " +
                "Values (@TestId , @TimeTaken, @Points)",
                RST
                );
        #endregion RST
        #region TMT
        public TrailMakingTest GetTrailMakingTest(int TestId)
            => db.ExecuteScalar<TrailMakingTest>(
                 "Select test_id as TestId," +
                "time_taken as Time_Taken," +
                "mistakes as Mistakes " +
                "from trail_making " +
                "where test_id = @TestId",
                 new { TestId = TestId }
                );
        public void SaveTrailMakingTest(TrailMakingTest TMT)
            => db.Execute(
                "insert into trail_making (test_Id , time_taken, mistakes) " +
                "Values (@TestId , @TimeTaken, @Mistakes)",
                TMT);
        #endregion

        public string GetParticipantTestPresetName(int testID)
            => db.ExecuteScalar<string>(
                "select preset_name from participant_tests where test_id = @ID", new {ID = testID}
            );
    }
}
