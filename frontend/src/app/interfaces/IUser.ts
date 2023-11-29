export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    is_verified: boolean;
    register_date: Date;
    auth_token: string;
    auth_key: number;
}
