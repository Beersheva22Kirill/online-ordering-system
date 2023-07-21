import { LoginData } from "../../Model/LoginData";
import { UserData } from "../../Model/UserData";
import { AuthService } from "./AuthService";
import {GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {oosApp} from "../../Config/firebase-config"
import { collection, getFirestore, doc, getDoc } from "firebase/firestore";

export default class AuthServiceFire implements AuthService {

    private auth = getAuth(oosApp)
    private administrators = collection(getFirestore(oosApp), 'administrators')

    async login(loginData: LoginData): Promise<UserData | null> {
         let userData: UserData|null = null;

         try {
                const userAuth = loginData.email === 'GOOGLE' 
                ? await signInWithPopup(this.auth, new GoogleAuthProvider()) 
                : await signInWithEmailAndPassword(this.auth,loginData.email,loginData.password)
                userData = {email: userAuth.user.email as string, role: await this.isAdmin(userAuth.user.uid) ? 'admin' : 'authorized', uid:userAuth.user.uid} 
         } catch (error) {
            
         }
         return userData
    }
    
    async logout(): Promise<void> {
        signOut(this.auth)
    }

    private async isAdmin(uid:any):Promise<boolean>{
        const docRef = doc(this.administrators, uid)

        return (await getDoc(docRef)).exists()
    }

}