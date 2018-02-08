using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using SDSA.Models.Localisation;
using SDSA.Repository.Interfaces;
using SDSA.Service.Interfaces;
namespace SDSA.Service
{
    public class LocalisationService : ILocalisationService
    {
        private readonly ILocalisationRepository _localisationRepository;
        public LocalisationService(ILocalisationRepository localRepo)
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

        public void SaveTestDetails(string LocaleName, int TestType, TestLocaleDetails Details) {
            _localisationRepository.SaveLocalePreset(LocaleName);

            switch(TestType){
                case 1:
                    _localisationRepository.SaveDotCancellationTest(LocaleName, Details);
                    break;
                case 2:
                    _localisationRepository.SaveCompassDirectionDetails(LocaleName, Details);
                    break;
                case 3:
                    _localisationRepository.SaveCarDirectionDetails(LocaleName, Details);
                    break;
                case 4:
                    _localisationRepository.SaveRoadSignScenarioDetails(LocaleName, Details);
                    break;
                case 5:
                    _localisationRepository.SaveTrailMakingDetails(LocaleName, Details);                
                    break;
                default:
                    Console.WriteLine("You done gone messed up...");
                    break;    
            }
        }

        public void SaveRoadSignScenario(string LocaleName, RoadSignScenario RSS) 
            => _localisationRepository.SaveRoadSignScenario(LocaleName, RSS);

        public RoadSignScenario SelectRoadSignScenario(int id) 
            => _localisationRepository.SelectRoadSignScenario(id);

        public TestLocaleDetails FetchTestLocalisationPreset(string LocaleName, int TestType) {
            // Gonna have to move Trail Making test... it shouldn't be an edge case :/
            
            TestLocaleDetails Deets = new TestLocaleDetails();

            if (_localisationRepository.CountPresetByName(LocaleName) == 0) {
                Console.WriteLine("No preset found ");
                return Deets;
            }
            switch(TestType){
                case 1:
                    Deets = _localisationRepository.SelectDotCancellationDetails(LocaleName);
                    break;
                case 2:
                    Deets = _localisationRepository.SelectCompassDirectionDetails(LocaleName);
                    break;
                case 3:
                    Deets = _localisationRepository.SelectCarDirectionDetails(LocaleName);
                    break;
                case 4:
                    Deets = _localisationRepository.SelectRoadSignScenarioDetails(LocaleName);
                    break;
                case 5:
                    Deets =_localisationRepository.SelectTrailMakingDetails(LocaleName);                
                    break;
                default:
                    Console.WriteLine("You done gone messed up...");
                    break;    
            }
            return Deets;
        }

        public IEnumerable<string> GetLocaleNames() 
            => _localisationRepository.GetLocaleNames();
    }
}
