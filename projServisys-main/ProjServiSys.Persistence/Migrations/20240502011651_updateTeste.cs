using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjServiSys.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updateTeste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InativaUsuario",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "DataAlteracaoInatividade",
                table: "AspNetUsers",
                newName: "DataCriacaoUser");

            migrationBuilder.AddColumn<int>(
                name: "TipoUsuario",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoUsuario",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "DataCriacaoUser",
                table: "AspNetUsers",
                newName: "DataAlteracaoInatividade");

            migrationBuilder.AddColumn<bool>(
                name: "InativaUsuario",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
