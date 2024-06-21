export default class OrderItem {
    private _id: string;
    // private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    // private _total: number;


    constructor(
      id: string,
      name: string,
      price: number,
      quantity: number,      
    ) {
      this._id = id;
      this._name = name;
      this._price = price;
      this._quantity = quantity;
    }

    get id(): string {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    // get productId(): string {
    //   return this._productId;
    // }
  
    get quantity(): number {
      return this._quantity;
    }
  
    get price(): number {
      return this._price;
    }
  
    orderItemTotal(): number {
      return this._price * this._quantity;
    }

  }