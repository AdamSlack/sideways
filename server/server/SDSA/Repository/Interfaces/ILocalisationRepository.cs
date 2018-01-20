using System.Collections.Generic;
using SDSA.Models;
using SDSA.Models.Localisation;

namespace SDSA.Repository.Interfaces 
{
    public interface ILocalisationRepository
    {
        LocalisationImage GetImage(int imageId);
        LocalisationImage GetImage(int localisationId, string ImageName);
        IEnumerable<ImageDescription> GetImageIdAndNameByLocalisationid(int localisationId);
        void SaveImage(LocalisationImage LI);

        void SaveLocalePreset(LocalePreset Preset);

        void SaveDotCancellationTest(string preset_name, TestLocaleDetails DCD);
        void SaveCompassDirectionDetails(string preset_name, TestLocaleDetails CDD );
        void SaveCarDirectionDetails(string preset_name, TestLocaleDetails CDD );
        void SaveRoadSignScenarioDetails(string preset_name, TestLocaleDetails RSD );
        void SaveTrailMaking(string preset_name, TestLocaleDetails TMD );

        TestLocaleDetails SelectDotCancellationDetails(string preset_name);
        TestLocaleDetails SelectCompassDirectionDetails(string preset_name);
        TestLocaleDetails SelectCarDirectionDetails(string preset_name);
        TestLocaleDetails SelectRoadSignScenarioDetails(string preset_name);
        TestLocaleDetails SelectTrailMakingDetails(string preset_name);

        int SelectSDSATestTypeID(string test_name);
        int CountPresetByName(string preset_name);
    }
}
