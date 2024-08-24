import Address from "../value-object/Address";
import CustomerFactory from "./customer.factory";

describe("customer factory unit tests", () => {

    it("should create a customer", () => {
        
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeTruthy();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined()
        expect(customer.rewardPoints).toBe(0);

    });

    it("should create a customer with a address", () => {

        const address = new Address("street", 123, "zip", "city");
        const customer = CustomerFactory.createWithAddress("John", address);

        
    });

});