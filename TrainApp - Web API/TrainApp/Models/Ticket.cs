using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class Ticket { 
    
        [Key]
        public int ticketID  { get; set; }
        public string type { get; set; }
        public string ticketImage { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public User Userobj { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TrainTrip TrainTripObj { get; set; }

    }
}