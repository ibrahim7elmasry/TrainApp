using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace TrainApp.Business_Logic
{
    public class IDGenerator
    {
        public string GenerateID(int size = 10, bool lowerCase = false)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        public int RandomNumber(int min = 1000, int max = 1000000)
        {
            Random random = new Random();
            return random.Next(min, max);
        }
    }
}