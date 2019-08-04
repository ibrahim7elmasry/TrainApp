using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace TrainApp.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }


        [Required]
        public string Username { get; set; }

        [Required]
        public String pass { get; set; }

        
        [Required]
        public string email { get; set; }

        public int phone { get; set;  }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ICollection <Ticket> Ticketlist { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ICollection <CommentsOntrain> CommentsOntrainlist { get; set;  }

    }
}