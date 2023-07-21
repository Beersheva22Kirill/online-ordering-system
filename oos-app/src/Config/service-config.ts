import { AuthService } from "../Services/Authentification/AuthService";
import AuthServiceFire from "../Services/Authentification/AuthServiceFire";
import { CategoryServiceFire } from "../Services/DataProcessor/CategoryServiceFire";
import { OrderServiceFire } from "../Services/DataProcessor/OrderServiceFire";
import ShoppingCardServiceFire from "../Services/DataProcessor/ShopingCardServiceFire";
import StockServiceFire from "../Services/DataProcessor/StockServiceFire";
import { CategoryService } from "../Services/DataProcessor/interfaces/CategoryesService";
import { OrderService } from "../Services/DataProcessor/interfaces/OrderService";
import { ShoppingCard } from "../Services/DataProcessor/interfaces/ShopingCard";
import { StockService } from "../Services/DataProcessor/interfaces/StockService";

export const LOCAL_STORAGE_ITEM_USER = 'localUser'

export const authService:AuthService = new AuthServiceFire()
export const stockService:StockService = new StockServiceFire()
export const shopingCardService:ShoppingCard = new ShoppingCardServiceFire()
export const orderService:OrderService = new OrderServiceFire()
export const categoryService:CategoryService = new CategoryServiceFire()