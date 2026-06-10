export type ErrorResponse = {
    message: string
}

export type SuccessResponse = {
    message : string
}

type Success<T> = { success: true; data: T };
type Failure<ErrorResponse> = { success: false; error: ErrorResponse };

export type Result<T, E> = Success<T> | Failure<E>;
