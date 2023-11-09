import { JwtPayload, jwtDecode } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    user_id: number;
    isAdmin: boolean;
    name: string;
    email: string;
    exp: number;
}

const token = localStorage.getItem('token');
const decodedToken: CustomJwtPayload = jwtDecode(token ? token : '');
const expirationTimestamp = decodedToken.exp;
const currentTimestamp = Math.floor(Date.now() / 1000);
export const isAdmin = decodedToken.isAdmin
export const name = decodedToken.name
export const email = decodedToken.email

if (expirationTimestamp && currentTimestamp > expirationTimestamp) {
    console.log('O token JWT expirou.');
} else {
    console.log('O token JWT ainda é válido.');
}
