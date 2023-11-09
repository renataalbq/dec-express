import { JwtPayload, jwtDecode } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    user_id: number;
    isAdmin: boolean;
    name: string;
    email: string;
}

const token = sessionStorage.getItem('token');
const decodedToken: CustomJwtPayload = jwtDecode(token ? token : '');
export const isAdmin = decodedToken.isAdmin
export const name = decodedToken.name
export const email = decodedToken.email
