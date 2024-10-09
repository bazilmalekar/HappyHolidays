using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class packageImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PackageImages",
                table: "PackageDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PackageImages",
                table: "PackageDetails");
        }
    }
}
