export interface IComment_Reply {
    id: number,
    comment_id: number,
    user_id: number,
    comment_date: Date,
    is_edited: boolean,
    content: string,
    up_votes: number,
    down_votes: number
}