using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
namespace SDSA.Models.Enums
{
    public enum AlgorithmErrorEnum
    {
        [Description("Missing test result for algorithm")]
        MissingData = 1,
        [Description ("No such algorithm")]
        MissingAlgorithm = 2

    }
}
