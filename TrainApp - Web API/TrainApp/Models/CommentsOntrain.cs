using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TrainApp.Models
{
    public class CommentsOntrain
    {
        [Key]
        public int CommentID { get; set; }
        public string  text { get; set; }
        public DateTime timeNow { get; set; }

        [ForeignKey("TrainPostObj")]
        public int PostID { get; set; }

        [ForeignKey("UserObj")]
        public int UserID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public User UserObj { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public TrainPost TrainPostObj { get; set; }

    }
}