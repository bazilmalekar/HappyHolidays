using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class ContactUsRev2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "ContactUs",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "ContactUs");
        }
    }
}
