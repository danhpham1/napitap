export interface IPaymentResponse{
    code:number,
    data:{
        gate:Array<IGate>,
        isec:Array<IIsec>,
        k:Array<IK>
    }
}

export interface IGate{
    vnd:number,
    game_amount: number
}

export interface IK{
    vnd: number,
    game_amount: number
}

export interface IIsec{
    vnd: number,
    game_amount: number,
    game_amount_rate: number
}