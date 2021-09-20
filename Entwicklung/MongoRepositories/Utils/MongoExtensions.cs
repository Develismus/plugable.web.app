using System.Linq;
using asp.plugin.core;
using MongoDB.Driver;

namespace MongoRepositories.Utils
{
    public static class MongoUtils 
    {
        public static UpdateDefinition<T> UpdateDefinitionFromDefinedValues<T>(this T obj) where T : class
        {
            var propertyDictionary = obj.ToDictionary();
            var first = propertyDictionary.First();
            var updateDefinition = Builders<T>.Update.Set(first.Key, first.Value);
            propertyDictionary.Remove(first.Key);

            foreach (var kvp in propertyDictionary)
            {
                updateDefinition.Set(kvp.Key, kvp.Value);
            }
            return updateDefinition;
        }
    }

}