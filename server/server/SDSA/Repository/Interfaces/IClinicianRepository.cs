using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
namespace SDSA.Repository.Interfaces
{
    public interface IClinicianRepository
    {
       Clinician GetClinician(int clinicianId);
        Clinician GetClinician(string email);

       IEnumerable<Clinician> GetAllClinicians();
       bool ValidateClinician(SDSAUser user);
    }
}
