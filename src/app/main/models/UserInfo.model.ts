export interface IUserInfoResponse{
    code:number,
    data:IUserInfo | IUserInfoError,
    message:string,
}


export interface IUserInfo{
    uid: string,
    server_id: number,
    role_id: number,
    nickname: string,
    username:string,
    email: string,
    tropy: number,
    normal_ticket: number,
    vip_ticket: number
}

export interface IUserInfoError{
    code: number,
    message: string,
    data: {
        error: number
    }
}