export interface IComment {
    id: number;
    thread_id: number;
    user_id: number;
    comment_date: Date;
    is_edited: boolean;
    up_votes: number;
    down_votes: number;
    content: string;
}

