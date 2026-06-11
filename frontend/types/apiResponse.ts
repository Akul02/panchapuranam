export type ErrorResponse = {
    message: string
}

export type SuccessResponse = {
    message : string
}

export type ApiResult<T> = 
    | {success: true, data: T}
    | {success: false, status: number, data: ErrorResponse}
