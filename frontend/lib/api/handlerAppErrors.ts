import { redirect } from "next/navigation";
import { ApiResult } from "../../types/apiResponse";

export async function handleAppErrors<T>(resultPromise: Promise<ApiResult<T>>): Promise<ApiResult<T>> {
    const apiResult = await resultPromise;

    if (apiResult.success == false) {
        if (apiResult.status == 401) {
            redirect("/login");
        }

        if (apiResult.status == 500) {
            redirect("/")
        }

        return apiResult;
    }

    return apiResult;
}