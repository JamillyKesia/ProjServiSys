using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjServiSys.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatePosicaoOS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosicaoEquipamento",
                table: "OrdensServico",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosicaoEquipamento",
                table: "OrdensServico");
        }
    }
}
