using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class VoteRevamp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DownVotes");

            migrationBuilder.DropTable(
                name: "UpVotes");

            migrationBuilder.CreateTable(
                name: "VoteComment",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    VoteType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteComment", x => new { x.UserId, x.CommentId });
                    table.ForeignKey(
                        name: "FK_VoteComment_Comments_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VoteComment_Users_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "VoteCommentReply",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CommentReplyId = table.Column<int>(type: "int", nullable: false),
                    VoteType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteCommentReply", x => new { x.UserId, x.CommentReplyId });
                    table.ForeignKey(
                        name: "FK_VoteCommentReply_CommentReplies_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VoteCommentReply_Users_CommentReplyId",
                        column: x => x.CommentReplyId,
                        principalTable: "CommentReplies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "VoteThread",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ThreadId = table.Column<int>(type: "int", nullable: false),
                    VoteType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteThread", x => new { x.UserId, x.ThreadId });
                    table.ForeignKey(
                        name: "FK_VoteThread_Threads_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VoteThread_Users_ThreadId",
                        column: x => x.ThreadId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VoteComment_CommentId",
                table: "VoteComment",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteCommentReply_CommentReplyId",
                table: "VoteCommentReply",
                column: "CommentReplyId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteThread_ThreadId",
                table: "VoteThread",
                column: "ThreadId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoteComment");

            migrationBuilder.DropTable(
                name: "VoteCommentReply");

            migrationBuilder.DropTable(
                name: "VoteThread");

            migrationBuilder.CreateTable(
                name: "DownVotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ContentId = table.Column<int>(type: "int", nullable: false),
                    ContentType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DownVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DownVotes_CommentReplies_ContentId",
                        column: x => x.ContentId,
                        principalTable: "CommentReplies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DownVotes_Comments_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DownVotes_Threads_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DownVotes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UpVotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ContentId = table.Column<int>(type: "int", nullable: false),
                    ContentType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UpVotes_CommentReplies_ContentId",
                        column: x => x.ContentId,
                        principalTable: "CommentReplies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UpVotes_Comments_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UpVotes_Threads_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UpVotes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DownVotes_ContentId",
                table: "DownVotes",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_DownVotes_UserId",
                table: "DownVotes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UpVotes_ContentId",
                table: "UpVotes",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_UpVotes_UserId",
                table: "UpVotes",
                column: "UserId");
        }
    }
}
