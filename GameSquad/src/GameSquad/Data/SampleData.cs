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
                    UserName = "Chase",
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
                    UserName = "Shane",
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
                    UserName = "Emma",
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
                    UserName = "Kris",
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
                    UserName = "Reg",
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
            new Team {TeamName = "Ivysaur", PlayStyle = "Competitive", TeamLeader = "Venasaur"},
            new Team {TeamName = "Wartortle", PlayStyle = "Competitive", TeamLeader = "Blastoise"},
            new Team {TeamName = "Charmeleon", PlayStyle = "Competitive", TeamLeader = "Charizard"},
            new Team {TeamName = "Pikachu", PlayStyle = "Competitive", TeamLeader = "Raichu"},
            new Team {TeamName = "Gyarados", PlayStyle = "Competitive", TeamLeader = "Mega Gyarados"},
            new Team {TeamName = "Eevee", PlayStyle = "Competitive", TeamLeader = "Can't Beat Eevee"},
                        };


                context.Teams.AddRange(listTeam);
                context.SaveChanges();

                context.TeamMembers.AddRange(
                   //Eevee
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Eevee").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Reg").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Eevee").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Shane").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Eevee").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Kris").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Eevee").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Emma").Id
                   },
                   new TeamMembers
                   {
                       TeamId = context.Teams.FirstOrDefault(m => m.TeamName == "Eevee").Id,
                       ApplicationUserId = context.Users.FirstOrDefault(a => a.UserName == "Chase").Id
                   });

                context.SaveChanges();


            }

        }
    }
}
