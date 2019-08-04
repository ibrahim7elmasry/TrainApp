using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class TrainType
    {
        [Key]
        public int TypeID { get; set; }
        public string Type { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual TrainTrip TrainTripObj { get; set; }
    }
}