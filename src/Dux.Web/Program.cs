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
              .UseStartup<Startup>()
              .Build();

            host.Run();

        }                
    }
}
