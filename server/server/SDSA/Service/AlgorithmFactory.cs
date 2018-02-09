using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDSA.Models.Interfaces;
using SDSA.Models.Enums;
using SDSA.Service.Algorithms;
namespace SDSA.Service
{
    public static class AlgorithmFactory
    {
        public static IAlgorithm GetInstance (AlgoritmEnum id)
        {
            switch (id)
            {
                case AlgoritmEnum.SDSA1:
                    return new SDSA1();
                default:
                    return null;
                    
            }
        }
    }
}
