using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using System.Data;
using Microsoft.Extensions.Configuration;
using Dapper;
using SDSA.Repository.Interfaces;

namespace SDSA.Repository{
    public class ParticipantRepository : IParticipantRepository{
        private readonly IDbConnection db;
        public ParticipantRepository(IConfiguration config){
            db =DBFactory.getConnection(config);
        }
        public int CreateParticipant()=> db.ExecuteScalar<int>(
            "insert into participants (participant_id) values (DEFAULT) RETURNING participant_id"
        );

        public int CreateParticipantTest(ParticipantTest PT) => db.ExecuteScalar<int> (
            "insert into participant_tests (participant_id, clinician_id, preset_name,test_date) " + 
            "values (@PID, @CID, @PresetName, CURRENT_DATE) returning test_id",
            new {PID = PT.ParticipantId, CID = PT.ClinicianId, PresetName = PT.LocalePreset}
        );
        
        public IEnumerable<int> GetParticipantTests(int ParticipantID){ 
             return db.Query<int>(
                "select test_id from participant_tests where participant_id = @PID",
                 new {PID = ParticipantID});
        }

        public IEnumerable<int> GetClinicianParticipants(int ClinicianID) {
            return db.Query<int>(
                "select distinct participant_id from participant_tests where clinician_id = @ClinicianID"
                 , new {ClinicianID = ClinicianID});
        }
    }
}
