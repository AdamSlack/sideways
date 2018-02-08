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
using SDSA.Models.Enums;

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
             => db.Query<DotCancellationTest>(
                "Select Test_Id as TestId ," +
                " time_taken as TimeTaken, " +
                "true_pos as TruePos," +
                "false_pos as FalsePos," +
                "false_neg as FalseNeg " +
                "from dot_cancellation " +
                "where test_id = @TestId",

                new { TestId = TestId }

                ).FirstOrDefault();
        #endregion
        #region CaDT
        public CarDirectionsTest GetCarDirectionsTest(int TestId)
            => db.Query<CarDirectionsTest>(
                "Select test_id as TestId ," +
                "time_taken as TimeTaken ," +
                "points as Points " +
                "from car_directions " +
                "where test_id = @TestId"
                ,
                new { TestId = TestId }
                ).FirstOrDefault();
        public void SaveCarDirectionTest(CarDirectionsTest CDT)
            => db.Execute(
                "insert into car_directions (test_Id , time_taken, points)" +
                "Values (@TestId , @TimeTaken, @Points)",
                CDT
                );
        #endregion
        
        #region CoDT
        public CompassDirectionsTest GetCompassDirectionsTest(int TestId)
            => db.Query<CompassDirectionsTest>(
                "Select test_id as TestId," +
                "time_taken as TimeTaken," +
                "points as Points " +
                "from compass_directions " +
                "where test_id = @TestId",
                new { TestId = TestId }
                ).FirstOrDefault();
                
        public void SaveCompassDirectionsTest(CompassDirectionsTest CDT)
            => db.Execute(
                "insert into compass_directions (test_Id , time_taken, points) " +
                "Values (@TestId , @TimeTaken, @Points)",
                CDT
                );
        #endregion
        
        #region RST
        public RoadScenariosTest GetRoadScenarioTest(int TestId)
            => db.Query<RoadScenariosTest>
            (
                 "Select test_id as TestId," +
                "time_taken as TimeTaken," +
                "points as Points " +
                "from road_scenarios " +
                "where test_id = @TestId ",
                new { TestId = TestId }
                ).FirstOrDefault();
                
        public void SaveRoadScenarioTest(RoadScenariosTest RST)
            => db.Execute(
                "insert into road_Scenarios (test_Id , time_taken, points) " +
                "Values (@TestId , @TimeTaken, @Points)",
                RST
                );
                
        #endregion RST
        #region TMT
        public TrailMakingTest GetTrailMakingTest(int TestId)
            => db.Query<TrailMakingTest>(
                 "Select test_id as TestId," +
                "time_taken as TimeTaken," +
                "mistakes as Mistakes " +
                "from trail_making " +
                "where test_id = @TestId",
                 new { TestId = TestId }
                ).FirstOrDefault();
        public void SaveTrailMakingTest(TrailMakingTest TMT)
            => db.Execute(
                "insert into trail_making (test_Id , time_taken, mistakes) " +
                "Values (@TestId , @TimeTaken, @Mistakes)",
                TMT);
        #endregion

        public string GetParticipantTestPresetName(int testID)
            => db.ExecuteScalar<string>(
                "select preset_name from participant_tests where test_id = @ID", new { ID = testID }
            );
        public AlgorithmResult GetAlgorithmResult(int testId, AlgoritmEnum algorithmId, bool getComponents = true)
        {
            var algorResult = db.QueryFirstOrDefault<AlgorithmResult>(
                "select test_id as testId, algorthim_id as AlgorithmId, r1 as R1 , r2 as R2, passed,result_json as resultJson \n" +
                "from algorithm_results"

                );
            if (algorResult != null && getComponents)
            {
                algorResult.components.CarDirectionsTest = this.GetCarDirectionsTest(testId);
                algorResult.components.CompassDirectionsTest = this.GetCompassDirectionsTest(testId);
                algorResult.components.DotCancellationTest = this.GetDotCancellationTest(testId);
                algorResult.components.TrailMakingTest = this.GetTrailMakingTest(testId);
                algorResult.components.RoadScenariosTest = this.GetRoadScenarioTest(testId);
            }
            return algorResult;
        }
        public void SaveAlgorithmReult (AlgorithmResult result)
        {
            db.Execute("insert into algorithm_results (test_id , algorthim_id, r1, r2, passed, result_json) " +
                "values (@TestId, @AlgorithmId, @R1, @R2, @passed, @resultJson) ",
                result);
        }
    }
}
