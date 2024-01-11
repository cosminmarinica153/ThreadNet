export interface ICreateCommentReplyDto {
  userId: number,
  commentId: number,
  content: string,
  uploadDate: Date,
  isEdited: number
}
