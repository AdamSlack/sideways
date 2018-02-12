using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models;
using SDSA.Models.Interfaces;
using SDSA.Models.Enums;
using Newtonsoft.Json;
namespace SDSA.Service.Algorithms
{
    public class SDSAHard : IAlgorithm
    {
        public AlgorithmResult Calulate(TestResults testResults)
        {
            var result = new AlgorithmResult() { Message = ""};
            if(testResults.DotCancellationTest == null)
            {
                result.error = AlgorithmErrorEnum.MissingData;
                result.Message = "Dot cancellation data required. ";

            }
            if (testResults.CompassDirectionsTest == null )
            {
                result.error = AlgorithmErrorEnum.MissingData;
                result.Message += "Compass direction data missing. ";
            }
            if (testResults.RoadScenariosTest == null)
            {
                result.error = AlgorithmErrorEnum.MissingData;
                result.Message += "Road scenario data missing. ";
            }
            if (result.error != 0)
                return result;
            result.R1 = passEquation(testResults);
             result.R2 = faileEquation(testResults);
             result.AlgorithmId = AlgoritmEnum.SDSA1;
                
            
            result.passed = result.R1 > result.R2;
            result.resultJson = JsonConvert.SerializeObject( new { Pass = result.R1 , fail = result.R2, result.passed   } );
            return result;
        }

        private double passEquation(TestResults TR)
            => (TR.DotCancellationTest.TimeTaken * 0.012) + (TR.DotCancellationTest.falsePos * 0.216) + (TR.CompassDirectionsTest.Points * 0.409) + (TR.RoadScenariosTest.Points * 1.168) - 23.79;
        private double faileEquation(TestResults TR)
            => (TR.DotCancellationTest.TimeTaken * 0.017) + (TR.DotCancellationTest.falsePos * 0.035) + (TR.CompassDirectionsTest.Points * 0.185) + (TR.RoadScenariosTest.Points * 0.813) - 0.042;
    }
}
