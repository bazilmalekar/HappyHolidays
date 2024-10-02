using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class ThumbnailImage : Migration
    {
        ///// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the existing 'CardThumbNailImage' column if it exists
            migrationBuilder.DropColumn(
                name: "CardThumbNailImage",
                table: "Packages");

            // Add a new 'CardThumbNailImage' column with the desired type
            migrationBuilder.AddColumn<byte[]>(
                name: "CardThumbNailImage",
                table: "Packages",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // In the down method, we reverse the changes
            migrationBuilder.DropColumn(
                name: "CardThumbNailImage",
                table: "Packages");

            migrationBuilder.AddColumn<string>(
                name: "CardThumbNailImage",
                table: "Packages",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
