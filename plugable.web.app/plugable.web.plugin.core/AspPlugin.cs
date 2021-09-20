using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace asp.plugin.core
{
    public abstract class AspPlugin
    {
        public IConfigurationRoot Configuration;
        public abstract void ConfigureServices(IServiceCollection services);
    }
}