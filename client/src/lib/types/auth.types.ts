export interface JWTClaims {
    sub: string;
}

export interface LoginFields {
    username: string;
    password: string;
    confirmPassword?: string;
}