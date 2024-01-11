export interface ICreateThreadDto {
  userId: number,
  categoryId: number,
  title: string,
  content: string,
  uploadDate: Date,
  isEdited: number
}
