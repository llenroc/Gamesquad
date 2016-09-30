using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using GameSquad.Models;

namespace GameSquad.Data
{
    public class SampleData
    {
        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            context.Database.EnsureCreated();

            // Ensure (IsAdmin)
            var chase = await userManager.FindByNameAsync("Chase");
            if (chase == null)
            {
                // create user
                chase = new ApplicationUser
                {
                    UserName = "Killerpie1232",
                    FirstName = "Chase",
                    LastName = "Base",
                    Email = "Chase@CoderCamps.com"
                };
                await userManager.CreateAsync(chase, "Secret123!");

                // add claims
                await userManager.AddClaimAsync(chase, new Claim("IsAdmin", "true"));
            }

            // Ensure (not IsAdmin)
            var shane = await userManager.FindByNameAsync("Shane");
            if (shane == null)
            {
                // create user
                shane = new ApplicationUser
                {
                    UserName = "Valquin",
                    FirstName = "Shane",
                    LastName = "Bane",
                    Email = "Shane@CoderCamps.com"
                };
                await userManager.CreateAsync(shane, "Secret123!");
            }
            var emma = await userManager.FindByNameAsync("Emma");
            if (emma == null)
            {
                // create user
                emma = new ApplicationUser
                {
                    UserName = "SleepyBear",
                    FirstName = "Emma",
                    LastName = "Delimma",
                    Email = "Emma@CoderCamps.com"
                };
                await userManager.CreateAsync(emma, "Secret123!");
            }
            var kris = await userManager.FindByNameAsync("Kris");
            if (kris == null)
            {
                // create user
                kris = new ApplicationUser
                {
                    UserName = "Sirpunchkillyou",
                    FirstName = "Kris",
                    LastName = "Bliss",
                    Email = "Kris@CoderCamps.com"
                };
                await userManager.CreateAsync(kris, "Secret123!");
            }
            var reg = await userManager.FindByNameAsync("Reg");
            if (reg == null)
            {
                // create user
                reg = new ApplicationUser
                {
                    UserName = "Reginator",
                    FirstName = "Reggie",
                    LastName = "Veggie",
                    Email = "Reg@CoderCamps.com"
                };
                await userManager.CreateAsync(reg, "Secret123!");
            }

            if (!context.Teams.Any())
            {
                var listTeam = new Team[]
                        {
            new Team {TeamName = "Cloud9", PlayStyle = "Competitive", TeamLeader = "KillYouNow"},
            new Team {TeamName = "RoxTigers", PlayStyle = "Competitive", TeamLeader = "CheatswithMei"},
            new Team {TeamName = "DarkPassage", PlayStyle = "Competitive", TeamLeader = "RougeBot"},
            new Team {TeamName = "Rouge", PlayStyle = "Competitive", TeamLeader = "XxMugenxX"},
            new Team {TeamName = "Fnatic", PlayStyle = "Competitive", TeamLeader = "BoomBampow"},
            new Team {TeamName = "TeamMeat", PlayStyle = "Casual", TeamLeader = "SuperMeatBoy"},
                        };


                context.Teams.AddRange(listTeam);
                context.SaveChanges();

                context.TeamMembers.AddRange(
                   //TeamMeat
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "TeamMeat").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Sirpunchkillyou").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "TeamMeat").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Killerpie1232").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "TeamMeat").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Reginator").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "TeamMeat").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Valquin").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "TeamMeat").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "SleepyBear").Id
                   },
                   //Cloud9
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Cloud9").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Killerpie1232").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Cloud9").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Sirpunchkillyou").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Cloud9").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Valquin").Id
                   });

                context.SaveChanges();


            }

        }
    }
}
