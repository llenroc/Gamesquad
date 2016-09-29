using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameSquad.Migrations
{
    public partial class friendReqtoUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "FriendRequests",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_ApplicationUserId",
                table: "FriendRequests",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_AspNetUsers_ApplicationUserId",
                table: "FriendRequests",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_AspNetUsers_ApplicationUserId",
                table: "FriendRequests");

            migrationBuilder.DropIndex(
                name: "IX_FriendRequests_ApplicationUserId",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "FriendRequests");
        }
    }
}
