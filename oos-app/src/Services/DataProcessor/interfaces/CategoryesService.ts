import { Category } from "../../../Model/Category";
import { Observable } from "rxjs";

export interface CategoryService {

    addCategory(category:Category):Promise<Category|string>;
    getCategoryById(id:any):Promise<Category>;
    getAllCategoryes():Observable<Category[]|string>;
    delcategoryes(id:any):Promise<void|string>;
    updateCategory(category:Category,id:any):Promise<Category|string>
    uploadImage(file:File):Promise<string>;

}