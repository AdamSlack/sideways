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
         => Db.Query<Clinician>("SELECT clinician_id as ID from clinicians where clinician_Id = @id", new { Id = id }).FirstOrDefault();
         
        public Clinician GetClinician(string Email)
         => Db.Query<Clinician>("SELECT clinician_id as ID from clinicians where email = @Email", new { Email }).FirstOrDefault();
        
        public bool ValidateClinician(SDSAUser user){
            HashSalt Pass = null;
            Console.WriteLine("Validating... " + user.Email);

            if (user.UserType == SDSAUser.loginuserType.Clinician){
                
                Pass = Db.Query<HashSalt>("SELECT hash, salt from clinicians where email = @email", new { email = user.Email }).FirstOrDefault();
            }   
            else{
                return false;
            }

            if (Pass == null) {
                return false;
            }
            
            return Pass.Compare(user.Password);
        }

    }
}
