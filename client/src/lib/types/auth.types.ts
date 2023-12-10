export interface JWTClaims {
    sub: string;
    id: string;
}

export interface LoginFields {
    username: string;
    password: string;
    confirmPassword?: string;
}