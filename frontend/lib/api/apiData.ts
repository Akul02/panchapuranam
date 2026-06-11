import { ApiResult, ErrorResponse } from "../../types/apiResponse";

export async function getApiData<T>(resultPromise: Promise<ApiResult<T>>): Promise<T> {

    const apiResult = await resultPromise;

    if (apiResult.success == false) {
        const errMsg = apiResult.message;
        throw new Error(errMsg)
    }

    return apiResult.data;
}