using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class inclustionExclusion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrimaryLocation",
                table: "Packages",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ExclusionsDescription",
                columns: table => new
                {
                    ExclusionsDescriptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItineraryDetailsId = table.Column<int>(type: "int", nullable: false),
                    ExclusionPoints = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExclusionsDescription", x => x.ExclusionsDescriptionId);
                    table.ForeignKey(
                        name: "FK_ExclusionsDescription_ItineraryDetails_ItineraryDetailsId",
                        column: x => x.ItineraryDetailsId,
                        principalTable: "ItineraryDetails",
                        principalColumn: "ItineraryDetailsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InclusionsDescription",
                columns: table => new
                {
                    InclusionsDescriptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItineraryDetailsId = table.Column<int>(type: "int", nullable: false),
                    InclusionPoints = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InclusionsDescription", x => x.InclusionsDescriptionId);
                    table.ForeignKey(
                        name: "FK_InclusionsDescription_ItineraryDetails_ItineraryDetailsId",
                        column: x => x.ItineraryDetailsId,
                        principalTable: "ItineraryDetails",
                        principalColumn: "ItineraryDetailsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExclusionsDescription_ItineraryDetailsId",
                table: "ExclusionsDescription",
                column: "ItineraryDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_InclusionsDescription_ItineraryDetailsId",
                table: "InclusionsDescription",
                column: "ItineraryDetailsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExclusionsDescription");

            migrationBuilder.DropTable(
                name: "InclusionsDescription");

            migrationBuilder.DropColumn(
                name: "PrimaryLocation",
                table: "Packages");
        }
    }
}
