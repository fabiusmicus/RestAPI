using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DataAPI
{
    public class Startup
    {
        // Data store
        private static Dictionary<string, object> data = new Dictionary<string, object>
        {
            { "message", "Hello, World!" }
        };

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        // GET API to fetch data
        [HttpGet]
        public ActionResult<Dictionary<string, object>> GetData()
        {
            return Startup.data;
        }

        // POST API to update data
        [HttpPost]
        public ActionResult<Dictionary<string, object>> UpdateData(Dictionary<string, object> update)
        {
            Startup.data = update;
            return Startup.data;
        }

        // PUT API to update data
        [HttpPut]
        public ActionResult<Dictionary<string, object>> ReplaceData(Dictionary<string, object> update)
        {
            foreach (var kvp in update)
            {
                Startup.data[kvp.Key] = kvp.Value;
            }
            return Startup.data;
        }
    }
}

