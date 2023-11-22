export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    is_verified: boolean;
    register_date: string;
    auth_token: string;
    auth_key: number;
}
