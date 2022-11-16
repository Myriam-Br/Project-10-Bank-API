import axiosInstance from "./ApiInstance";

export function loginUser(object) {
    console.log('OBJECT',object);
    return axiosInstance.post(`/login`, object)
}