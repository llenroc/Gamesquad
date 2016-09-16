using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameSquad.Migrations
{
    public partial class addRemovePsot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserName",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserName",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Posts");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User",
                table: "Posts");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserName",
                table: "Posts",
                column: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserName",
                table: "Posts",
                column: "UserName",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
