using SDSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Service.Interfaces
{
    public interface IClinicianService
    {

        Clinician GetClinician(int clinicianId);
        Clinician GetClinician(string email);
        IEnumerable<Clinician> GetAllClinicians();
        bool ValidateClinician(SDSAUser user);

    }
}
