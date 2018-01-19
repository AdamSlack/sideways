using Microsoft.Extensions.Configuration;
using SDSA.Models;
using SDSA.Models.Localisation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SDSA.Repository.Interfaces;

namespace SDSA.Repository
{
    public class LocalisationRepository : ILocalisationRepository
    {
        private readonly IDbConnection db;
        public LocalisationRepository(IConfiguration config)
        {
            db = DBFactory.getConnection(config);
        }
        #region participantTest
        public void SaveImage(LocalisationImage LI)
        => db.ExecuteScalar<int>(
            "insert into localistaion_images (preset_id, image_name ,image, file_type) " +
            "Values (@PresetId,@ImageName,  @Image, @FileTpye) ",
            LI
            );
        public LocalisationImage GetImage(int localisationId, string ImageName)
        => db.ExecuteScalar<LocalisationImage>(
            "select preset_id as presetId," +
            "image_id as ImageId," +
            "image_name as Imagename" +
            "image as Image," +
            "file_type as FileType" +
            "from localisation_images  " +
            "where preset_id = @localisationId and imagename = @ImageName",
            new { localisationId, ImageName }
            );

        public LocalisationImage GetImage(int imageId)
        => db.ExecuteScalar<LocalisationImage>(
            "select preset_id as presetId," +
            "image_id as ImageId," +
            "image_name as Imagename" +
            "image as Image," +
            "file_type as FileType" +
            "from localisation_images  " + 
            "where image_id = @imageId",
            imageId);

        public IEnumerable< ImageDescription> GetImageIdAndNameByLocalisationid (int localisationId)
            => db.Query<ImageDescription>(
            "select image_id as ImageId," +
            "image_name as Imagename," +
            "description "+
            "from localisation_images  " +
            "where preset_id  = @localisationId",
            param: localisationId);

        public int CountPresetByName(string preset_name)
            => db.ExecuteScalar<int>(
                "select count(*) from sdsa_test_details " +
                "where preset_name = @preset_name",
                new {preset_name}
            );

        public void SaveLocalePreset(LocalePreset Preset) {
            string preset_name = Preset.Name;
            bool alreadyExists = CountPresetByName(preset_name) >= 1;

            if (alreadyExists) {
                Console.WriteLine("Preset Already exists. Donezo");
                return;
            }

            Console.WriteLine("Inserting New Preset for: " + preset_name);
            db.ExecuteScalar<int>(
                "insert into localisation_preset (preset_name) " +
                "values (@preset_name)",
                new {preset_name}
            );
        }

        public int SelectSDSATestTypeID(string test_name) 
            => db.ExecuteScalar<int>(
                "select id from sdsa_test_types " +
                "where name = @test_name ",
                new {test_name}
            );

        public void SaveDotCancellationTest(string preset_name, DotCancellationDetails DCD){
            Console.WriteLine("Inserting Dot Cancellation Test: " + preset_name);

            string instructions = DCD.GeneralDetails.Instructions;
            string name = DCD.GeneralDetails.Name;
            int test_type = SelectSDSATestTypeID("dot_cancellation");
            
            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions)" +
                "values (@preset_name, @test_type, @name, @instructions)",
                new {preset_name, test_type, name, instructions}
            );
        }

        // This and CarDirections could be done in one. bite me...
        public void SaveCompassDirectionDetails(string preset_name, CompassDirectionDetails CDD) {
            Console.WriteLine("Inserting Compass Direction Details: " + preset_name);

            string instructions = CDD.GeneralDetails.Instructions;
            string name = CDD.GeneralDetails.Name;
            string headings_label = CDD.MatrixDetails.HeadingsLabel;
            string deck_label = CDD.MatrixDetails.DeckLabel;
            int test_type = SelectSDSATestTypeID("compass_directions");
            
            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label)" +
                "values (@preset_name, @test_type, @name, @instructions, @headings_label, @deck_label)",
                new {preset_name, test_type, name, instructions, headings_label, deck_label}
            );
        }

        // This and CarDirections could be done in one. bitr me...
        public void SaveCarDirectionDetails(string preset_name, CarDirectionDetails CDD) {
          Console.WriteLine("Inserting Car Direction Details: " + preset_name);

            string instructions = CDD.GeneralDetails.Instructions;
            string name = CDD.GeneralDetails.Name;
            string headings_label = CDD.MatrixDetails.HeadingsLabel;
            string deck_label = CDD.MatrixDetails.DeckLabel;
            int test_type = SelectSDSATestTypeID("car_directions");
            
            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label)" +
                "values (@preset_name, @test_type, @name, @instructions, @headings_label, @deck_label)",
                new {preset_name, test_type, name, instructions, headings_label, deck_label}
            );
        }

        public void SaveRoadSignDetails(string preset_name, RoadSignScenarioDetails RSD) {

        }

        public void SaveTrailMaking(string preset_name, TrailMakingDetails TMD) {

        }
    }
}
#endregion