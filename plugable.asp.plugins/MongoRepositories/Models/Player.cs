using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;

namespace MongoRepositories.Models
{
    [Serializable]
    public class Player
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Group { get; set; }
        [BsonDictionaryOptions(DictionaryRepresentation.Document)]
        public IDictionary<string, string> Identifiers { get; set; }

        [BsonDateTimeOptions(DateOnly = false, Kind = DateTimeKind.Utc, Representation = BsonType.DateTime)]
        public DateTime wentOnline { get; set; }

        [BsonDateTimeOptions(DateOnly = false, Kind = DateTimeKind.Utc, Representation = BsonType.DateTime)]
        public DateTime wentOffline { get; set; }

        public string lastOnlineOnServer { get; set; }

        public int currentHandle { get; set; }

    }
}
