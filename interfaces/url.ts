export interface IUserSession {
    email: string,
    sub: string,
    id: number,
    iat: number,
    exp: number,
    jti: string
}

export interface ISessionType {
    user: IUserSession
}