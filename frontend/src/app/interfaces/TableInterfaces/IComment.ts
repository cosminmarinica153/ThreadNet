export interface IComment {
    id: number;
    userId: number;
    threadId: number;
    content: string;
    commentDate: Date;
    isEdited: boolean;
}


