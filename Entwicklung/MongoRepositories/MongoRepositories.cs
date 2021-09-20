using System;
using asp.plugin.core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MongoRepositories.Repositories;

namespace MongoRepositories
{
    public class MongoRepositories : AspPlugin
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IMongoClient, MongoClient>(prov =>
                new MongoClient(Configuration.GetConnectionString("MongoDB")));
            services.AddTransient<IPlayerRepository, PlayerRepository>();
        }
    }
}
