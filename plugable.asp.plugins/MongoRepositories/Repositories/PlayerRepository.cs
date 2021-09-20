using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using MongoRepositories.Models;
using MongoRepositories.Utils;

namespace MongoRepositories.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly IMongoCollection<Player> _players;

        public PlayerRepository(IMongoClient client)
        {
            var database = client.GetDatabase("fivem");
            var collection = database.GetCollection<Player>("users");
            _players = collection;
        }


        public async Task<string> Create(Player player)
        {
            await _players.InsertOneAsync(player);
            return player.Id;
        }

        public Task<Player> Get(string objectId)
        {

            var filter = Builders<Player>.Filter.Eq(p => p.Id, objectId);
            var player = _players.Find(filter).FirstOrDefaultAsync();
            return player;
        }

        public async Task<IEnumerable<Player>> Get(int skip, int limit)
        {
            var players = await _players.Find(_ => true).Skip(skip).Limit(limit).ToListAsync();
            return players;
        }

        public async Task<IEnumerable<Player>> GetByIdentifier(IDictionary<string, string> identifiers)
        {
            var first = identifiers.First();
            identifiers.Remove(first.Key);
            var filter = Builders<Player>.Filter.Eq( $"{nameof(Player.Identifiers)}.{first.Key}", first.Value);
            foreach (var kvp in identifiers)
            {
                filter |= Builders<Player>.Filter.Eq(p => p.Identifiers[kvp.Key], kvp.Value);
            }

            var j = filter.Render(_players.DocumentSerializer, BsonSerializer.SerializerRegistry);


            var players = await _players.Find(filter).ToListAsync();

            return players;
        }

        public async Task<bool> Update(string objectId, Player player)
        {
            var filter = Builders<Player>.Filter.Eq(p => p.Id, objectId);
            var update = player.UpdateDefinitionFromDefinedValues();

            var result = await _players.UpdateOneAsync(filter, update);
            return result.ModifiedCount == 1;
        }

        public async Task<bool> Delete(string objectId)
        {
            var filter = Builders<Player>.Filter.Eq(c => c.Id, objectId);
            var result = await _players.DeleteOneAsync(filter);

            return result.DeletedCount == 1;
        }

    }
}
