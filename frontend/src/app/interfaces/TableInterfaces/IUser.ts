export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    registerDate: Date;
    isVerified: boolean;
    authToken: string;
    authKey: number;
}
