using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SDSA.Repository;
using SDSA.Repository.Interfaces;
using SDSA.Service;
using SDSA.Service.Interfaces;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace SDSA
{
    public class Startup
    {
 
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Configuration["JWT:SecurityKey"]));
            // Add framework services.
            var issuer = Configuration.GetValue<string>("JWT:issuer");
           // services.AddIdentity<ApplicationUser, Microsoft.AspNetCore.Identity.IdentityRole>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    // ValidAudience = Configuration.GetValue<string>("JWT:domain"),
                    IssuerSigningKey = key,
                
                };
            });

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowCredentials();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();             
            CorsPolicy corsPolicy = corsBuilder.Build();

            services.AddCors(x => x.AddPolicy("AllowAllCORS", corsPolicy));

            services.AddMvc();
            services.AddSingleton<IConfiguration>(Configuration);

            //Dependency injection
            //add repository first to avoid missing dependencies
            services.AddTransient<IClinicianRepository, ClinicianRepository>();
            services.AddTransient<ITestRepository, TestRepository>();
            services.AddTransient<ILocalisationRepository, LocalisationRepository>();
            services.AddTransient<IParticipantRepository, ParticipantRepository>();

            services.AddTransient<ITestService, TestService>();
            services.AddTransient<IClinicianService, ClinicianService>();
            services.AddTransient<ILocalisationService, LocalisationService>();
            services.AddTransient<IParticipantService, ParticipantService>();
        }   


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseAuthentication();

            app.UseCors("AllowAllCORS");
            app.UseStaticFiles();
            
            app.UseStatusCodePages(
                async context =>
             {
                 context.HttpContext.Response.ContentType =  "application/json";
                 var x = context.HttpContext.Response;
                 string statusMessage;
                 switch (x.StatusCode)
                 {
                     case 403:
                         statusMessage = "Forbidden";
                         break;
                     case 404:
                         statusMessage = "Not found";
                         break;
                     case 401:
                         statusMessage = "Unathorized";
                         break;
                     default:
                         statusMessage = "";
                         break;
                 }
                 await context.HttpContext.Response.WriteAsync(
        JsonConvert.SerializeObject(new { message = statusMessage }));
       // context.HttpContext.Response.StatusCode + $": {statusMessage}");
             } 
            );

            app.UseMvc(routes =>
            {
            routes.MapRoute(
                name: "Test",
                template:  "Tests/{TestId}/{action}"
            );

            routes.MapRoute(
                name : "Participant",
                template : "Participant/Create/{action=Test}"
            );

            routes.MapRoute(
                name: "Localisation",
                template: "Localisation/{LocaleName}/{test_type}"
            );

            routes.MapRoute(
                name: "default",
                template: "{controller=Test}/{id?}/{action=Index}"
            );

            });
        }
    }
}