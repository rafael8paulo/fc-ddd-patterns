import Product from "../entity/product";
import RepositoryInterface from "../../@shared/event/repository/repository-interface";

export default interface ProductRespositoryInterface extends RepositoryInterface<Product> {
    
}