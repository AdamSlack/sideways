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
        //@deprecated because this is just wrong to be here. 
        //Why all of sudden is there participant test creation code inside here like what standard
        //Also regiosn, regions i hate this. if the code is that unsearchable it requires sectioning with 
        ///Silly region tags then the semantics are all wrong
        #region participantTest
        public int SavePatricipantTest(ParticipantTest PT)
        => db.ExecuteScalar<int>(
            "insert into participant_tests (test_id, participant_id , clinician_id, test_date) " +
            "Values (DEFAULT,@ParticipentId, @ClinicianId, CURRENT_TIME) " +
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
        
        //TODO: remvoe this one but apparently needed for some call
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
                "insert into car_directions (test_Id , time_taken, points, test_date)" +
                "Values (@TestId , @TimeTaken, @Points, now())",
                new {TestId = CDT.TestId, TimeTaken = CDT.TimeTaken, Points = CDT.points }
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
                "insert into compass_directions (test_Id , time_taken, points, test_date) " +
                "Values (@TestId , @TimeTaken, @Points, now())",
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
                "insert into road_Scenarios (test_Id , time_taken, points, test_date) " +
                "Values (@TestId , @TimeTaken, @Points, now())",
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
        public void SaveTrailMakingTest(TrailMakingTest TMT) {
            Console.WriteLine("Repo Layer: " + TMT.TestId);
            db.Execute(
                "insert into trail_making (test_id, time_taken, mistakes, test_date) " +
                    "values (@TestId,@TimeTaken, @Mistakes, NOW())",
                new {TestId = TMT.TestId, TimeTaken = TMT.TimeTaken, Mistakes=TMT.Mistakes});
        }
        #endregion


        public string GetParticipantTestPresetName(int testID)
            => db.ExecuteScalar<string>(
                "select preset_name from participant_tests where test_id = @ID", new { ID = testID }
            );

        public IEnumerable<Algorithm> GetAlgorithms() {
            return db.Query<Algorithm>(
                "select algorithm_id as AlgorithmId, algorithm_name as AlgorithmName from algorithm"
            );
        }
        public AlgorithmResult GetAlgorithmResult(int testId, AlgoritmEnum algorithmId, bool getComponents = true)
        {
            Console.WriteLine("Fetching Algorithm Results.");
            var algorResult = db.Query<AlgorithmResult>(
                "Select test_id as TestId, " +
                " algorithm_id as AlgorithmId, " +
                " r1 as R1, "+
                " r2 as R2, "+
                " passed as passed, " +
                " result_json as resultJson " +
                "  from algorithm_results " +
                "   where algorithm_id = @algorithmId " + 
                "    and test_id = @testId ",
                new { algorithmId = algorithmId, testId = testId } 
                ).FirstOrDefault();

            Console.WriteLine("Checking if there are even any Algorithm Results.");

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
            db.Execute("insert into algorithm_results (test_id , algorithm_id, r1, r2, passed, result_json) " +
                "values (@TestId, @AlgorithmId, @R1, @R2, @passed, cast (@resultJson as Jsonb)) on conflict do nothing",
                result);
        }

        public void AddInteractionLog(int testID, int testType, TestInteraction TI) {
            db.Execute("insert into test_interactions (test_id, test_type, interaction) values (@A, @B, @C) on conflict do nothing",
            new {A = testID, B = testType, C = TI.Interaction});
        }

        public IEnumerable<TestInteraction> getTestLogs(int testID) {
            return db.Query<TestInteraction>(
                "select test_id as TestId, test_type as TestType, interaction as Interaction " +
                " from test_interactions where test_id = @A",
                new { A = testID }
            );
        }

    }
}
