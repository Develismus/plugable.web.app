using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoRepositories.Models;

namespace MongoRepositories.Repositories
{
    public interface IPlayerRepository
    {
        Task<string> Create(Player player);
        Task<Player> Get(string objectId);
        Task<IEnumerable<Player>> Get(int skip, int limit);
        Task<IEnumerable<Player>> GetByIdentifier(IDictionary<string, string> identifiers);

        Task<bool> Update(string objectId, Player player);
        Task<bool> Delete(string objectId);
    }
}
