using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
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

           // should the same key as in TokenService
           var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = key,
                      ValidateIssuer = false,
                      ValidateAudience = false 
                    };
                });
           // Token will be available for the lifetime of http request to our API
           services.AddScoped<TokenService>();

           return services;
        }
    }
}