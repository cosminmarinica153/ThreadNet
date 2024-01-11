export interface ICreateUserDto {
    email: string,
    username: string,
    password: string,
    registerDate: Date,
    isVerified: number,
    authToken: string,
    authKey: number
}
