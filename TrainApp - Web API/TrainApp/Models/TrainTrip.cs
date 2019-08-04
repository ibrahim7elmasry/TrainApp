using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class TrainTrip
    {
        public string LeaveStation { get; set; }
        public string ArriveStation  { get; set; }
        
        [Key]
        public int TrainID { get; set; }
        public DateTime TrainTripStart { get; set; }
        public DateTime TrainTripFinish { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual TrainPost TrainPostObj { get; set; }

        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<station> StationList { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<Ticket> TicketList { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual TrainType TrainTypeObj { get; set; }
    }
}