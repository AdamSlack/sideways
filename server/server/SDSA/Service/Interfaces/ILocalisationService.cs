using SDSA.Models;
using SDSA.Models.Localisation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Service.Interfaces
{
    public interface ILocalisationService
    {
        LocalisationImage GetImage(int imageId);
        LocalisationImage GetImage(int localisationId, string ImageName);
        IEnumerable<ImageDescription> GetImageIdAndNameByLocalisationid(int localisationId);
        void SaveImage(LocalisationImage LI);
        IEnumerable<string> GetLocaleNames();
        void SaveTestDetails(string LocaleName, int TestType, TestLocaleDetails Details);
        TestLocaleDetails FetchTestLocalisationPreset(string LocaleName, int TestType);
        void SaveRoadSignScenario(string LocaleName, RoadSignScenario RSS);
        RoadSignScenario SelectRoadSignScenario(int id);
    }
}
