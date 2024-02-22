using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LenzPerson.api.Migrations
{
    /// <inheritdoc />
    public partial class AddtablecustomerDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgreeTerms",
                table: "CustomerDetails");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AgreeTerms",
                table: "CustomerDetails",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
