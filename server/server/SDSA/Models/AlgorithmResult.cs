using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models.Enums;
namespace SDSA.Models
{
    public class AlgorithmResult
    {
        public int TestId { get; set; }
        public AlgoritmEnum AlgorithmId { get; set; }
        public  double R1 { get; set; }
        public double R2 { get; set; }
        public bool passed { get; set; }
        public TestResults components { get; set; }
        public AlgorithmErrorEnum error { get; set; }
        public string Message { get; set; }
        public string resultJson { get; set; }
    }
}
