using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models
{
    public class SDSAUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public loginuserType UserType { get; set; }
        public enum loginuserType
        {
            Clinician =1,
            Participant = 2,
            Reasearcher = 3 
        }
    }
  
}
