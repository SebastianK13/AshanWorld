using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AshanWorld.Startup))]
namespace AshanWorld
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
