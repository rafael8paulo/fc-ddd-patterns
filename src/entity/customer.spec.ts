import Address from "./Address";
import Customer from "./customer";

describe("Custumer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "John");
            customer.changeName("");
        }).toThrowError("Id is required");
    })


    it("should throw error when name is empty", () => {
        expect(() => {
            const customer = new Customer("123", "");
            customer.changeName("");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    })

    it("should activate customer", () => {
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "13330-250", "São Paulo");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "Customer 1");        
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });


});