using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class station
    {
        public String Name { get; set; }

        [Key]
        public int stationID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<TrainTrip> TrainTripList { get; set; }
    }
}