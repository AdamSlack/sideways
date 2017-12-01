using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using SDSA.Models;
using Npgsql;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.SqlServer;
using System.Data.SqlClient;
using SDSA.Repository.Interfaces;
using System.Security.Cryptography;
namespace SDSA.Repository
{
    public class ClinicianRepository : IClinicianRepository
    {
        
        IDbConnection Db;
        public ClinicianRepository(IConfiguration config)
        {
            Db = DBFactory.getConnection(config);
        }
        public IEnumerable<Clinician> GetAllClinicians()
         => Db.Query<Clinician>("SELECT clinician_id as ID from clinicians");

        public Clinician GetClinician(int id)
         => Db.ExecuteScalar<Clinician>("SELECT clinician_id as ID from clinicians where clinician_Id = @id", new { Id = id });
        public bool ValidateClinician(SDSAUser user)
        {
            HashSalt Pass = null;
            if (user.UserType == SDSAUser.loginuserType.Clinician)
            {
                Pass = Db.ExecuteScalar<HashSalt>("SELECT Hash , Salt from clinicians where email = @email", new { email = user.Email });
            }
            else
                return false;
            if (Pass == null)
                return false;
            return Pass.Compare(user.Password);
        }

    }
}
