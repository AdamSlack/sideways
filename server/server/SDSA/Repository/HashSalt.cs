using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace SDSA.Repository
{
    internal class HashSalt
    {
        public string Hash { get; set; }
        public string Salt { get; set; }

        public static HashSalt GenerateHash(string password, string salt = null)
        {
            if (salt == null)
                salt = getSalt();

            Console.WriteLine("Salt: " + salt);

            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(salt + password);
            var hasher = SHA512.Create();
            return new HashSalt { Hash = Convert.ToBase64String(hasher.ComputeHash(bytes)), Salt = salt };
        }

        private static string getSalt()
        {
            var rng = RandomNumberGenerator.Create();
            byte[] salt = new byte[25];
            rng.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }

        /// <summary>
        /// compares password to current has and salt
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool Compare(string password)
        {
            HashSalt p1 = HashSalt.GenerateHash(password, Salt);
            return p1.Hash == Hash && p1.Salt == Salt;
        }

    }
}
