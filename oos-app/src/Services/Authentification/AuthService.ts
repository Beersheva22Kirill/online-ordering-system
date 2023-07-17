import { LoginData } from "../../Model/LoginData";
import { UserData } from "../../Model/UserData";

export interface AuthService {

    login(loginData:LoginData): Promise<UserData|null>;
    logout():Promise<void>;

}