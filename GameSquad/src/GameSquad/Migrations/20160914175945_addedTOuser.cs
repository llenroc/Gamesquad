using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameSquad.Migrations
{
    public partial class addedTOuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserProfId",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_UserProfId",
                table: "Teams",
                column: "UserProfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_UserProfs_UserProfId",
                table: "Teams",
                column: "UserProfId",
                principalTable: "UserProfs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_UserProfs_UserProfId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_UserProfId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "UserProfId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Posts");
        }
    }
}
