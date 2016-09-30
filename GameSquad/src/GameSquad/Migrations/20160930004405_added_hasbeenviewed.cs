using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameSquad.Migrations
{
    public partial class added_hasbeenviewed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasBeenViewed",
                table: "Messages",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasBeenViewed",
                table: "FriendRequests",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SendingUserName",
                table: "FriendRequests",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasBeenViewed",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "HasBeenViewed",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "SendingUserName",
                table: "FriendRequests");
        }
    }
}
