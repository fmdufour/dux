using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace Dux.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
              .UseKestrel()
              .UseContentRoot(Directory.GetCurrentDirectory()) 
              .UseUrls("http://localhost:8080")
              .UseStartup<Startup>()
              .Build();

            host.Run();

        }                
    }
}
