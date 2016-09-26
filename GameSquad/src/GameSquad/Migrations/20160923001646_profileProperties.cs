using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GameSquad.Migrations
{
    public partial class profileProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropTable(
                name: "UserProfs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserProfs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Bio = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Platform = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.AddColumn<int>(
                name: "UserProfId",
                table: "Teams",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_UserProfId",
                table: "Teams",
                column: "UserProfId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfs_UserId",
                table: "UserProfs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_UserProfs_UserProfId",
                table: "Teams",
                column: "UserProfId",
                principalTable: "UserProfs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
