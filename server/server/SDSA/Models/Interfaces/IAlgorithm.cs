using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SDSA.Models.Interfaces
{
    public interface IAlgorithm
    {
        AlgorithmResult Calulate(TestResults testResults);
       
    }
}
