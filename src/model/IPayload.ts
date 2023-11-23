import { JwtPayload } from "jwt-decode";

export interface IPayload extends JwtPayload {
  user_id: number;
  isAdmin: boolean;
  name: string;
  email: string;
  exp: number;
}