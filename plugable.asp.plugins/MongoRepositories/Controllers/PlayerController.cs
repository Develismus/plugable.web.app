using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoRepositories.Models;
using MongoRepositories.Repositories;

namespace PlayerRepo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerController(IPlayerRepository repository)
        {
            _playerRepository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Player player)
        {
            var id = await _playerRepository.Create(player);
            return new JsonResult(id);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var player = await _playerRepository.Get(id);
            return new JsonResult(player);
        }
        //[HttpGet("api/player/{skip}/{limit}")]
        [HttpGet("*")]
        public async Task<IActionResult> Get(int skip, int limit = 20)
        {
            var players = await _playerRepository.Get(skip, limit);
            return new JsonResult(players);
        }

        [HttpGet("ByIdentifiers/")]
        public async Task<IActionResult> GetByIdentifiers([FromBody]IDictionary<string,string> identifiers)
        {
            var players = await _playerRepository.GetByIdentifier(identifiers);
            return new JsonResult(players);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Player player)
        {
            var result = await _playerRepository.Update(id, player);
            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _playerRepository.Delete(id);
            return new JsonResult(result);
        }
    }
}
