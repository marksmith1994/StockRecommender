using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Quartz;
using StockRecommender.Core;
using StockRecommender.Models;
using StockRecommender.Services;

namespace StockRecommender
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var builder = Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    // Add services
                    services.AddSingleton<FinnhubService>(sp => new FinnhubService("cvr251hr01qp88co60f0cvr251hr01qp88co60fg"));
                    services.AddSingleton<StockAnalyzer>();

                    // Add Quartz services
                    services.AddQuartz(q =>
                    {
                        q.UseMicrosoftDependencyInjectionJobFactory();

                        // Create a job key
                        var jobKey = new JobKey("StockAnalysisJob");

                        // Register the job
                        q.AddJob<StockAnalysisJob>(opts => opts.WithIdentity(jobKey));

                        // Create a trigger
                        q.AddTrigger(opts => opts
                            .ForJob(jobKey)
                            .WithIdentity("StockAnalysisJob-trigger")
                            .WithCronSchedule("0 0 * ? * * *")); // Run every hour
                    });

                    // Add Quartz hosted service
                    services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
                });

            var host = builder.Build();
            await host.RunAsync();
        }
    }
}
