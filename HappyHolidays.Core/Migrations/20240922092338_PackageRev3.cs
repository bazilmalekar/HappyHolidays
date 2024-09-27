using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class PackageRev3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardThumbNailImage",
                table: "Packages",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardThumbNailImage",
                table: "Packages");
        }
    }
}
