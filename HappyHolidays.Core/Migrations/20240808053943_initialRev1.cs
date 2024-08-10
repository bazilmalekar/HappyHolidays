using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    /// <inheritdoc />
    public partial class initialRev1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PackageLocation",
                table: "Packages",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PackageDetails",
                columns: table => new
                {
                    PackageDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PackageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageDetails", x => x.PackageDetailsId);
                    table.ForeignKey(
                        name: "FK_PackageDetails_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "PackageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItineraryDetails",
                columns: table => new
                {
                    ItineraryDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PackageDetailsId = table.Column<int>(type: "int", nullable: false),
                    ItineraryTitle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItineraryDetails", x => x.ItineraryDetailsId);
                    table.ForeignKey(
                        name: "FK_ItineraryDetails_PackageDetails_PackageDetailsId",
                        column: x => x.PackageDetailsId,
                        principalTable: "PackageDetails",
                        principalColumn: "PackageDetailsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItineraryDescription",
                columns: table => new
                {
                    ItineraryDescriptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItineraryDetailsId = table.Column<int>(type: "int", nullable: false),
                    ItenaryPoints = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItineraryDescription", x => x.ItineraryDescriptionId);
                    table.ForeignKey(
                        name: "FK_ItineraryDescription_ItineraryDetails_ItineraryDetailsId",
                        column: x => x.ItineraryDetailsId,
                        principalTable: "ItineraryDetails",
                        principalColumn: "ItineraryDetailsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItineraryDescription_ItineraryDetailsId",
                table: "ItineraryDescription",
                column: "ItineraryDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_ItineraryDetails_PackageDetailsId",
                table: "ItineraryDetails",
                column: "PackageDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageDetails_PackageId",
                table: "PackageDetails",
                column: "PackageId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItineraryDescription");

            migrationBuilder.DropTable(
                name: "ItineraryDetails");

            migrationBuilder.DropTable(
                name: "PackageDetails");

            migrationBuilder.DropColumn(
                name: "PackageLocation",
                table: "Packages");
        }
    }
}
