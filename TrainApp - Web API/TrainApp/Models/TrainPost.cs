using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class TrainPost
    {
        [Key]
        public int PostID { get; set; }
        public String Text { get; set; }
        public DateTime timeNow { get; set; }

        [JsonIgnore]
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual TrainTrip TrainTripObj { get; set; }
        [JsonIgnore]
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public virtual ICollection<CommentsOntrain> CommentsOntrainList { get; set; }
    }
}