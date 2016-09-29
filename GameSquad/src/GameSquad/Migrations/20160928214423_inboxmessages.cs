using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GameSquad.Migrations
{
    public partial class inboxmessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_UserInbox_InboxId",
                table: "FriendRequests");

            migrationBuilder.DropIndex(
                name: "IX_FriendRequests_InboxId",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "InboxId",
                table: "FriendRequests");

            migrationBuilder.DropTable(
                name: "UserMessage");

            migrationBuilder.DropTable(
                name: "UserInbox");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    DateSent = table.Column<DateTime>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    Subject = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ApplicationUserId",
                table: "Messages",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

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

            migrationBuilder.CreateTable(
                name: "UserMessage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    DateSent = table.Column<DateTime>(nullable: false),
                    InboxId = table.Column<int>(nullable: true),
                    Message = table.Column<string>(nullable: true),
                    RecievingUserId = table.Column<string>(nullable: true),
                    SendingUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMessage_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserMessage_UserInbox_InboxId",
                        column: x => x.InboxId,
                        principalTable: "UserInbox",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.AddColumn<int>(
                name: "InboxId",
                table: "FriendRequests",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_InboxId",
                table: "FriendRequests",
                column: "InboxId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInbox_UserId",
                table: "UserInbox",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_ApplicationUserId",
                table: "UserMessage",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_InboxId",
                table: "UserMessage",
                column: "InboxId");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_UserInbox_InboxId",
                table: "FriendRequests",
                column: "InboxId",
                principalTable: "UserInbox",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
