using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using SDSA.Service.Interfaces;
using SDSA.Repository.Interfaces;

namespace SDSA.Service
{
    public class ClinicianService : IClinicianService
    {
        IClinicianRepository _clinicianRepository;
        public ClinicianService (IClinicianRepository clinRepo)
        {
            _clinicianRepository = clinRepo;
        }
        public IEnumerable<Clinician> GetAllClinicians()
        => _clinicianRepository.GetAllClinicians();

        public Clinician GetClinician(int clinicianId)
           => _clinicianRepository.GetClinician(clinicianId);
        public bool ValidateClinician(SDSAUser user)
            => _clinicianRepository.ValidateClinician(user);

        public Clinician GetClinician(string email)
            => _clinicianRepository.GetClinician(email);
    }
}
