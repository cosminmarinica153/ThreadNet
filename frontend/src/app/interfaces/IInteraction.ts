export interface IInteraction {
    user_id: number;
    liked_threads: number[],
    disliked_threads: number[],
    liked_comments: number[],
    disliked_comments: number[],
    liked_replies: number[],
    disliked_replies: number[],
    favourite_threads: number[],
    favourite_categories: number[],
    friends: number[]
}
