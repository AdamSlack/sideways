using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using System.Data;
using Microsoft.Extensions.Configuration;
using Dapper;
using SDSA.Repository.Interfaces;

namespace SDSA.Repository
{
    public class ParticipantRepository : IParticipantRepository
    {
        private readonly IDbConnection db;
        public ParticipantRepository(IConfiguration config)
        {
            DBFactory.getConnection(config);
        }
        public int SaveParticipant(Participant p)
            => db.ExecuteScalar<int>(
                "insert into participant (participant_id) values (DEFAULT) RETURNING participant_id"
                );
        public IEnumerable<int> GetParticipantTests(int participantId)
        => db.Query<int>(
                "select test_id from participant_tests where participant_id = @participantId",
                new { participantId = participantId }
                );
    }
}
