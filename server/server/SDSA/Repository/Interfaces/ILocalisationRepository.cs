﻿using System.Collections.Generic;
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

        void SaveLocalisation(LocalePreset Preset);
    }
}