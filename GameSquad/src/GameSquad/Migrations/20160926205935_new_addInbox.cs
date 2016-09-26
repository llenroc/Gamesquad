using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GameSquad.Migrations
{
    public partial class new_addInbox : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserInbox",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInbox", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserInbox_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.AddColumn<int>(
                name: "InboxId",
                table: "UserMessage",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InboxId",
                table: "FriendRequests",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_InboxId",
                table: "UserMessage",
                column: "InboxId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_InboxId",
                table: "FriendRequests",
                column: "InboxId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInbox_UserId",
                table: "UserInbox",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_UserInbox_InboxId",
                table: "FriendRequests",
                column: "InboxId",
                principalTable: "UserInbox",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_UserInbox_InboxId",
                table: "UserMessage",
                column: "InboxId",
                principalTable: "UserInbox",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_UserInbox_InboxId",
                table: "FriendRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_UserInbox_InboxId",
                table: "UserMessage");

            migrationBuilder.DropIndex(
                name: "IX_UserMessage_InboxId",
                table: "UserMessage");

            migrationBuilder.DropIndex(
                name: "IX_FriendRequests_InboxId",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "InboxId",
                table: "UserMessage");

            migrationBuilder.DropColumn(
                name: "InboxId",
                table: "FriendRequests");

            migrationBuilder.DropTable(
                name: "UserInbox");
        }
    }
}
