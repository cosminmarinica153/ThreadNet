export interface ICommentReply {
    id: number,
    userId: number,
    commentId: number,
    content: string,
    commentDate: Date,
    isEdited: boolean,
}
