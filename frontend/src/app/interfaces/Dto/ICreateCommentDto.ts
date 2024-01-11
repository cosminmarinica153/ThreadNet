export interface ICreateCommentDto {
  userId: number,
  threadId: number,
  content: number,
  uploadDate: Date,
  isEdited: number
}
