using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Localisation
{
    public class TestLocaleDetails
    {
        // public TestLocaleDetails(string DeetsType, string DeetsName, string DeetsInstructions) {
        //     Type = DeetsType;
        //     Name = DeetsName;
        //     Instructions = DeetsInstructions;
        // }

        // public TestLocaleDetails(string DeetsType, string DeetsName, string DeetsInstructions, string DeetsHeadingsLabel ,string DeetsDeckLabel) {
        //     Type = DeetsType;
        //     Name = DeetsName;
        //     Instructions = DeetsInstructions;
        //     HeadingsLabel = DeetsHeadingsLabel;
        //     DeckLabel = DeetsDeckLabel;
        // }

        // public TestLocaleDetails(string DeetsType, string DeetsName, string DeetsInstructions, Array DeetsTrailA ,Array DeetsTrailB) {
        //     Type = DeetsType;
        //     Name = DeetsName;
        //     Instructions = DeetsInstructions;
        //     TrailA = (string[]) DeetsTrailA;
        //     TrailB = (string[]) DeetsTrailB;
        // }

        // public TestLocaleDetails(string DeetsType, string DeetsName, string DeetsInstructions, string DeetsHeadingsLabel ,string DeetsDeckLabel, RoadSignScenario[] DeetsScenarios) {
        //     Type = DeetsType;
        //     Name = DeetsName;
        //     Instructions = DeetsInstructions;
        //     HeadingsLabel = DeetsHeadingsLabel;
        //     DeckLabel = DeetsDeckLabel;
        //     RoadSignScenarios = DeetsScenarios;
        // }

        public string Type { get; set;}
        public string Name { get; set;}
        public string Instructions { get; set; }

        public string HeadingsLabel { get; set; }

        public string DeckLabel { get; set; }
    
        public string[] TrailA { get; set; }
        public string[] TrailB { get; set; }

        public RoadSignScenario[] RoadSignScenarios { get; set; }
    }
}
