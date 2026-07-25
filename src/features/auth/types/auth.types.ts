export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginDataResponse;
    statusCode: number;
}

interface LoginDataResponse {
    id: string;
    token: string;
}