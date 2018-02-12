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
                "select count(*) from localisation_presets " +
                "where preset_name = @preset_name",
                new {preset_name}
            );

        public void SaveLocalePreset(string PresetName) {
            string preset_name = PresetName;
            bool alreadyExists = CountPresetByName(PresetName) > 0;

            if (alreadyExists) {
                Console.WriteLine("Preset Already exists. Donezo");
                return;
            }

                // " INSERT INTO localisation_presets " +
                //     "(preset_name) " +
                // "SELECT @PresetName " +
                // "WHERE " +
                //     "NOT EXISTS ( " +
                //         "SELECT preset_name FROM example_table WHERE preset_name = @PresetName " +
                //     ")" +

            Console.WriteLine("Inserting New Preset for: " + PresetName + " if it does not exist.");
            db.ExecuteScalar<int>(
                "insert into localisation_presets (preset_name) " +
                "values (@PresetName) on conflict do nothing ",
                new {PresetName}
            );
        }

        public int SelectSDSATestTypeID(string test_name) 
            => db.ExecuteScalar<int>(
                "select id from sdsa_test_types " +
                "where name = @test_name ",
                new {test_name}
            );

        public int CountLocaleTestPresets(string PresetName, int TestType) 
            => db.ExecuteScalar<int>(
                "select count(*) from sdsa_test_details " +
                "where preset_name = @PresetName " +
                "and sdsa_test_type = @TestType",
                new {PresetName, TestType}
            );

        public int CountTrailPreset(string PresetName) 
            => db.ExecuteScalar<int>(
                "select count(*) from trail_making_details " +
                "where preset_name = @PresetName " ,
                new {PresetName}
            );


        public void DeleteLocaleTestPreset(string PresetName, int TestType)
            => db.ExecuteScalar(
                "delete from sdsa_test_details " +
                "where preset_name = @PresetName " +
                "and sdsa_test_type = @TestType",
                new {PresetName, TestType}
            );

        public void DeleteTrailPreset(string PresetName)
            => db.ExecuteScalar(
                "delete from trail_making_details " +
                "where preset_name = @PresetName " ,
                new {PresetName}
            );

        public void DeleteLocaleTestPresetIfExists(string PresetName, int TestType) {

            if(TestType == 5 ) {
                bool TrailPresetExists = CountTrailPreset(PresetName) > 0;
                if(TrailPresetExists) {
                    Console.WriteLine("Trail Making Preset exists for this Locale.");
                    DeleteTrailPreset(PresetName);
                }
                return;
            }
            bool TestPresetExists = CountLocaleTestPresets(PresetName, TestType) > 0;
            
            if(TestPresetExists) {
                Console.WriteLine("Localisation Preset Details Exist for this Locale and Test.");
                Console.WriteLine("Replacing Old Details.");
                DeleteLocaleTestPreset(PresetName, TestType);
            }
        }

        public void SaveDotCancellationTest(string preset_name, TestLocaleDetails DCD){
            Console.WriteLine("Inserting Dot Cancellation Test: " + preset_name);

            string instructions = DCD.Instructions;
            string name = DCD.Name;
            int test_type = SelectSDSATestTypeID("dot_cancellation");

            DeleteLocaleTestPresetIfExists(preset_name, test_type);

            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions)" +
                "values (@preset_name, @test_type, @name, @instructions)",
                new {preset_name, test_type, name, instructions}
            );
        }

        // This and CarDirections could be done in one. bite me...
        public void SaveCompassDirectionDetails(string preset_name, TestLocaleDetails CDD) {
            Console.WriteLine("Inserting Compass Direction Details: " + preset_name);

            string instructions = CDD.Instructions;
            string name = CDD.Name;
            string headings_label = CDD.HeadingsLabel;
            string deck_label = CDD.DeckLabel;
            int test_type = SelectSDSATestTypeID("compass_directions");
            
            DeleteLocaleTestPresetIfExists(preset_name, test_type);

            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label)" +
                "values (@preset_name, @test_type, @name, @instructions, @headings_label, @deck_label)",
                new {preset_name, test_type, name, instructions, headings_label, deck_label}
            );
        }

        // This and CarDirections could be done in one. bitr me...
        public void SaveCarDirectionDetails(string preset_name, TestLocaleDetails CDD) {
          Console.WriteLine("Inserting Car Direction Details: " + preset_name);

            string instructions = CDD.Instructions;
            string name = CDD.Name;
            string headings_label = CDD.HeadingsLabel;
            string deck_label = CDD.DeckLabel;
            int test_type = SelectSDSATestTypeID("car_directions");
            
            DeleteLocaleTestPresetIfExists(preset_name, test_type);

            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label)" +
                "values (@preset_name, @test_type, @name, @instructions, @headings_label, @deck_label)",
                new {preset_name, test_type, name, instructions, headings_label, deck_label}
            );
        }


        public void DeleteRoadSignScenarios(string PresetName) {
            Console.WriteLine("Deleting All old Road Sign Scenarios for this preset.");
            db.ExecuteScalar("delete from road_sign_scenarios where preset_name = @PresetName", new {PresetName});

        }

        public void SaveRoadSignScenarioDetails(string preset_name, TestLocaleDetails RSD) {
            Console.WriteLine("Inserting Road Sign scenario Test: " + preset_name);

            string instructions = RSD.Instructions;
            string name = RSD.Name;
            int test_type = SelectSDSATestTypeID("road_sign_scenarios");

            DeleteLocaleTestPresetIfExists(preset_name, test_type);
            DeleteRoadSignScenarios(preset_name);
            db.ExecuteScalar<int>(
                "insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions)" +
                "values (@preset_name, @test_type, @name, @instructions)",
                new {preset_name, test_type, name, instructions}
            );
            Console.WriteLine("Recieved " + RSD.RoadSignScenarios.Length + " Road Sign Scenarios...");

            string signPath = "roadSigns/" + preset_name + "/";
            string scenePath = "roadScenarios/" + preset_name + "/";

            System.IO.Directory.CreateDirectory("wwwroot/" + signPath);
            System.IO.Directory.CreateDirectory("wwwroot/" + scenePath);

            int idx = 1;
            foreach (RoadSignScenario RSS in RSD.RoadSignScenarios){
                
                // This needs putting into a try catch as well as a precheck for base 64 string...
                System.IO.File.WriteAllBytes("wwwroot/" + signPath + "Sign" + idx + ".png", Convert.FromBase64String(RSS.SignImage.Replace("data:image/png;base64,", String.Empty)));
                System.IO.File.WriteAllBytes("wwwroot/" + scenePath + "Scene" + idx + ".png", Convert.FromBase64String(RSS.SceneImage.Replace("data:image/png;base64,", String.Empty)));
                
                db.ExecuteScalar<int>(
                    "insert into road_sign_scenarios (preset_name, sign_image, scene_image, sign_file_type, scene_file_type, xpos, ypos) " +
                    "values (@PresetName,@SignImage,@SceneImage,@SignType,@SceneType,@xPos,@yPos)",
                    new {
                        PresetName  =   RSS.presetName,
                        SignImage   =   signPath + "Sign" + idx,
                        SceneImage  =   scenePath + "Scene" + idx,
                        SignType    =   RSS.SignFileType,
                        SceneType   =   RSS.SceneFileType,
                        xPos        =   RSS.xPos,
                        yPos        =   RSS.yPos
                    }
                );

                idx++;
            }
        }

        public void SaveRoadSignScenario(string PresetName, RoadSignScenario RSS) {
            Console.WriteLine("Inserting Road sign Scenario into the Database: " + PresetName);
            
        }

        public void SaveTrailMakingDetails(string preset_name, TestLocaleDetails TMD) {
            string Instructions = TMD.Instructions;
            string Name = TMD.Name;
            string[] TrailA = TMD.TrailA;
            string[] TrailB = TMD.TrailB;


            int test_type = SelectSDSATestTypeID("trail_making");
            
            DeleteLocaleTestPresetIfExists(preset_name, test_type);

            db.ExecuteScalar<int>(
                "insert into trail_making_details (preset_name, name, instructions, trail_a, trail_b)" +
                "values (@preset_name, @Name, @Instructions, @TrailA, @TrailB)",
                new {preset_name, Name, Instructions, TrailA, TrailB}
            );
        }
        public TestLocaleDetails SelectDotCancellationDetails(string PresetName) {
            Console.WriteLine("Selecting Dot Cancellation Locale Preset Details: " + PresetName);

            TestLocaleDetails Deets = (TestLocaleDetails) db.Query<TestLocaleDetails>(
                "select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions from sdsa_test_types, (" +
                "select sdsa_test_type, name, instructions from sdsa_test_details " +
                "where sdsa_test_type = 1 " + 
                "and preset_name = @PresetName) as preset " +
                "where preset.sdsa_test_type = sdsa_test_types.id",
                new {PresetName}
            ).FirstOrDefault();

            return Deets;
        }

        public TestLocaleDetails SelectCompassDirectionDetails(string PresetName) {
            Console.WriteLine("Selecting Compass Directions Locale Preset Details: " + PresetName);

            TestLocaleDetails Deets = (TestLocaleDetails) db.Query<TestLocaleDetails>(
                "select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions, " +
                "preset.headings_label as HeadingsLabel, preset.deck_label as DeckLabel " + 
                "from sdsa_test_types, (select sdsa_test_type, name, instructions, headings_label, deck_label from sdsa_test_details " +
                "where sdsa_test_type = 2 " + 
                "and preset_name = @PresetName) as preset " +
                "where preset.sdsa_test_type = sdsa_test_types.id",
                new {PresetName}
            ).FirstOrDefault();

            return Deets;
        }

        public TestLocaleDetails SelectCarDirectionDetails(string PresetName) {
            Console.WriteLine("Selecting Car Directions Locale Preset Details: " + PresetName);

            Console.WriteLine("select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions, " +
                "preset.headings_label as HeadingsLabel, preset.deck_label as DeckLabel " + 
                "from sdsa_test_types, (select sdsa_test_type, name, instructions, headings_label, deck_label from sdsa_test_details " +
                "where sdsa_test_type = 3 " + 
                "and preset_name = @PresetName) as preset " +
                "where preset.sdsa_test_type = sdsa_test_types.id");
                
            TestLocaleDetails Deets = (TestLocaleDetails) db.Query<TestLocaleDetails>(
                "select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions, " +
                "preset.headings_label as HeadingsLabel, preset.deck_label as DeckLabel " + 
                "from sdsa_test_types, (select sdsa_test_type, name, instructions, headings_label, deck_label from sdsa_test_details " +
                "where sdsa_test_type = 3 " + 
                "and preset_name = @PresetName) as preset " +
                "where preset.sdsa_test_type = sdsa_test_types.id",
                new {PresetName}
            ).FirstOrDefault();

            return Deets;
        }

        public TestLocaleDetails SelectRoadSignScenarioDetails(string PresetName) {
            Console.WriteLine("Selecting Road Sign Scenario Locale Preset Details: " + PresetName);

            // Selection of Base locale preset details.
            TestLocaleDetails Deets = (TestLocaleDetails) db.Query<TestLocaleDetails>(
                "select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions from sdsa_test_types, (" +
                "select sdsa_test_type, name, instructions from sdsa_test_details " +
                "where sdsa_test_type = 4 " + 
                "and preset_name = @PresetName) as preset " +    
                "where preset.sdsa_test_type = sdsa_test_types.id",
                new {PresetName}
            ).FirstOrDefault();

            IEnumerable<RoadSignScenario> RSSs = db.Query<RoadSignScenario>(
                "select road_sign_id as id, preset_name as presetName, xpos as xPos, ypos as yPos, " +
                "sign_image as SignImage, scene_image as SceneImage " +  
                "from road_sign_scenarios where preset_name = @PresetName",
                new {PresetName}
            );
            Deets.RoadSignScenarios = RSSs.ToArray();
            Console.WriteLine("Selected Road Sign Scenarios: " + Deets.RoadSignScenarios.LongCount() + " of them...");
            return Deets;
        }

        public RoadSignScenario SelectRoadSignScenario(int id) {
            Console.WriteLine("Selecting Road Sign Scenario: " + id);
            RoadSignScenario RSS = (RoadSignScenario) db.Query<RoadSignScenario>(
                "select road_sign_id as id, preset_name as presetName, xpos as xPos, ypos as yPos, " +
                "sign_image as SignImage, scene_image as SceneImage " +  
                "from road_sign_scenarios where road_sign_id=@id",
                 new {id = id}
            ).FirstOrDefault();

            return RSS;
        }

        public TestLocaleDetails SelectTrailMakingDetails(string PresetName) {
            Console.WriteLine("Selecting Trail Making Locale Preset Details: " + PresetName);

            TestLocaleDetails Deets = (TestLocaleDetails) db.Query<TestLocaleDetails>(
                "select sdsa_test_types.name as Type, preset.name as Name, preset.instructions as Instructions, " +
                "preset.trail_a as TrailA, preset.trail_b as TrailB " + 
                "from sdsa_test_types, (select name, instructions, trail_a, trail_b from trail_making_details " +
                "where preset_name = @PresetName) as preset " +
                "where sdsa_test_types.id = 5",
                new {PresetName}
            ).FirstOrDefault();

            return Deets;
        }

        public IEnumerable<string> GetLocaleNames() {
            Console.WriteLine("Selecting all LocaleNames");
            return db.Query<string>(
                "select preset_name from localisation_presets"
            );
        }

    }
}
#endregion
