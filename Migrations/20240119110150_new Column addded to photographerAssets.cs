﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LenzPerson.api.Migrations
{
    /// <inheritdoc />
    public partial class newColumnadddedtophotographerAssets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrls",
                table: "PhotographerAssets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrls",
                table: "PhotographerAssets");
        }
    }
}
