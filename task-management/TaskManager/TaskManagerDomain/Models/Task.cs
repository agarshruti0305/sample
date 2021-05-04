using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TaskManagerDomain.Models;

namespace TaskManager.Models
{
    public class Task
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string TaskName { get; set; }
        public string User { get; set; }
        [Required]
        public DateTime TaskDate { get; set; }
        public Status TaskStatus { get; set; }
    }
}
