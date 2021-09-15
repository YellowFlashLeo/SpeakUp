using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
           services.AddIdentityCore<AppUser>(opt => 
           {
               opt.Password.RequireNonAlphanumeric = false;
           })
           .AddEntityFrameworkStores<DataContext>()
           .AddSignInManager<SignInManager<AppUser>>();

           services.AddAuthentication();
           // Token will be available for the lifetime of http request to our API
           services.AddScoped<TokenService>();

           return services;
        }
    }
}