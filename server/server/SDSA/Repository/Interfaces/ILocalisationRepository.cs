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
        
        void SaveDotCancellationTest(string preset_name, DotCancellationDetails DCD);
        void SaveCompassDirectionDetails(string preset_name, CompassDirectionDetails CDD );
        void SaveCarDirectionDetails(string preset_name, CarDirectionDetails CDD );
        void SaveRoadSignDetails(string preset_name, RoadSignScenarioDetails RSD );
        void SaveTrailMaking(string preset_name, TrailMakingDetails TMD );

        int SelectSDSATestTypeID(string test_name);
        int CountPresetByName(string preset_name);
    }
}