using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using SDSA.Repository.Interfaces;
using SDSA.Service.Interfaces;
namespace SDSA.Service
{
    public class Localisationservice : ILocalisationService
    {
        private readonly ILocalisationRepository _localisationRepository;
        public Localisationservice(ILocalisationRepository localRepo)
        {
            _localisationRepository = localRepo;
        }
        public LocalisationImage GetImage(int localisationid)
             => _localisationRepository.GetImage(localisationid);

        public LocalisationImage GetImage(int localisationId, string ImageName)
            => _localisationRepository.GetImage(localisationId, ImageName);

        public IEnumerable<ImageDescription> GetImageIdAndNameByLocalisationid(int localisationId)
            => _localisationRepository.GetImageIdAndNameByLocalisationid(localisationId);
        
        public void SaveImage(LocalisationImage LI)
             => _localisationRepository.SaveImage(LI);
    }
}
