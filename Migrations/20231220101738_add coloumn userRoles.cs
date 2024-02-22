using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LenzPerson.api.Migrations
{
    /// <inheritdoc />
    public partial class addcoloumnuserRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserRole",
                table: "CustomerDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "CustomerDetails");
        }
    }
}
