using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Npgsql;

namespace SDSA.Repository
{
    public static class DBFactory
    {
        public static IDbConnection getConnection (IConfiguration config)
        {

            string mode = config.GetValue<string>("ConnectionStrings:Mode");
            if (string.IsNullOrEmpty(mode))
                throw new Exception("Mode not specified");
            string connectionString = config.GetValue<string>($"ConnectionStrings:{mode}");
            if (string.IsNullOrEmpty(connectionString))
                throw new Exception("Connection string nto found.");

            switch (mode)
            {
                case "(localdb)\\ProjectsV13":
                 return new SqlConnection(connectionString);
                case "PostGreSQL1":
                case "adams_local_db":  
                    return new NpgsqlConnection(connectionString);                  
                case "MAE-09_local":
                case "deans_local_db":
                    return new NpgsqlConnection(connectionString);
                default:
                    throw new Exception("No handler for that connection string.");
            }
                
        }
    }
}
