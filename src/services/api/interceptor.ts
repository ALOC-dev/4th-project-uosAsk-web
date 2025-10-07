import { AxiosInstance } from "axios";

/**
 * @description Axios 요청/응답 인터셉터를 처리하는 함수
 * @param instance AxiosInstance
 * @returns AxiosInstance (인터셉터가 추가된 인스턴스)
 */
export const setInterceptors = (instance: AxiosInstance) => {
    // HTTP status code 핸들링의 부재와 Request/Response Interceptor를 통한 추상화의 불필요함 때문에 아직 적지 않음.
    // 추후에 기능보완에서 작성할 것.
}