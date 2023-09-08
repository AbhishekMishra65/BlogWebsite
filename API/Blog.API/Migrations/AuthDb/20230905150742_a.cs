using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.API.Migrations.AuthDb
{
    /// <inheritdoc />
    public partial class a : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "edc267ec-d43c-4e3b-8108-a1a1f819906d",
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "2653693b-8c72-4e73-a994-1526cc466aa7", "abhishek@gmail.com", "ABHISHEK@GMAIL.COM", "ABHISHEK@GMAIL.COM", "AQAAAAIAAYagAAAAEI0IAhiXhKS5T4E2bNcauH5DDneekMqNVs70xidIDoitwQUxIQzx4FBVsqYXlsIvNA==", "cfc6b753-1d5a-4f3f-a8b8-50b851ce3089", "abhishek@gmail.com" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "edc267ec-d43c-4e3b-8108-a1a1f819906d",
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "9e0b7464-e741-4d06-96ce-7e548443c391", "admin@codepulse.com", "ADMIN@CODEPULSE.COM", "ADMIN@CODEPULSE.COM", "AQAAAAIAAYagAAAAECZS37/paBfEJuyMapSr/WbBDqsMMSyIDoXO0/uIF8XkArA4jLNrsIVOdIqUOkcl9Q==", "bb518567-0656-46ed-9402-015d1d7440d4", "admin@codepulse.com" });
        }
    }
}
