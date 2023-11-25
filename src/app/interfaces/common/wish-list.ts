import {Product} from "./product.interface";

export interface WishList {
    _id?: string;
    product?: Product | any;
    user?: string | any;
    selectedQty?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
