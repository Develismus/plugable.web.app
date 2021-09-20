using System;
using asp.plugin.core;

using Microsoft.Extensions.DependencyInjection;

namespace DiscordAndGit
{
    public class Class1 : AspPlugin
    {
        private IServiceCollection collection;

        public override void ConfigureServices(IServiceCollection services)
        {
            collection = services;

            collection.A

        }
    }
}
