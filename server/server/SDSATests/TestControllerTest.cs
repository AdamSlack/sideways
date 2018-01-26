using System;
using System.Collections.Generic;
using System.Text;
using System;
using Xunit;
using Moq;
using SDSA.Controllers;
using SDSA.Service;
using SDSA.Service.Interfaces;
using SDSA.Models.Tests;
using SDSA.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SDSA.Models;

namespace SDSATests
{
    public class TestControllerTest
    {
        [Fact]
        public void  AlgorrithmResultTest ()
        {
            var mockTestService = new Mock<ITestRepository>();
            mockTestService.Setup(f => f.GetTrailMakingTest(1)).Returns(new TrailMakingTest{Mistakes =1 , TestId =1 , TimeTaken = 1 });
            mockTestService.Setup(f => f.GetCompassDirectionsTest(1)).Returns(new CompassDirectionsTest { Points = 1, TimeTaken = 1, TestId = 1 });
            mockTestService.Setup(f => f.GetDotCancellationTest(1)).Returns(new DotCancellationTest { falseNeg = 1, falsePos = 1, TestId = 1, TimeTaken = 1, TruePos = 1 });
            mockTestService.Setup(f => f.GetCarDirectionsTest(1)).Returns(new CarDirectionsTest { points = 1, TimeTaken = 1, TestId = 1 });
            mockTestService.Setup(F => F.GetRoadScenarioTest(1)).Returns(new RoadScenariosTest { Points = 1, TestId = 1, TimeTaken = 1 });
           
            var TestService = new TestService(mockTestService.Object);
            var a = new TestController(null, TestService, null);
            var result = a.AlgorithmResult(1, SDSA.Models.Enums.AlgoritmEnum.SDSA1);
            Assert.IsType<JsonResult>(result);
            var Aj = (JsonResult)result; 
            Assert.True( ((AlgorithmResult)Aj.Value).R1 == -11.985);
            Assert.True(((AlgorithmResult)Aj.Value).R2 == -8.992);
        }
    }
}
