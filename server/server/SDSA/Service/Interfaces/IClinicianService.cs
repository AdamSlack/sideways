using SDSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Service.Interfaces
{
    interface IClinicianService
    {

        Clinician GetClinician(int clinicianId);
        IEnumerable<Clinician> GetAllClinicians();

    }
}
