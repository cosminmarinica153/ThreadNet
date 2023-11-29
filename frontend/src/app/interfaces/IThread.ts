
export interface IThread {
    id: number;
    user_id: number;
    category_id: number;
    thread_date: Date;
    is_edited: boolean;
    title: string;
    content: string;
    up_votes: number;
    down_votes: number;
    
}
