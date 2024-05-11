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

export interface IUrlCreateReq {
    long_url: any,
    status: any,
    msg: any
}