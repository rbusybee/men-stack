const lib = require('../lib');
const mail = require('../mail');
const db = require('../db');

// Grouping Tests
describe('absolute function', ()=> {
    it('should return +ve when input is +ve', () => {
        const res = lib.absolute(1);
        expect(res).toBe(1);
    });
    
    it('should return +ve when input is -ve', () => {
        const res = lib.absolute(-1);
        expect(res).toBe(1);
    });
    
    it('should return 0 when input is 0', () => {
        const res = lib.absolute(0);
        expect(res).toBe(0);
    });
});


// Testing String: shouldn't be specific, it should be general
describe('greet', ()=>{
    it('should return geerting message', ()=>{
        const res = lib.greet('Romio');
        expect(res).toMatch(/Romio/);
        expect(res).toContain('Romio');
    });
});

// Testing Array
describe('getCurrencies', ()=> {
    it('should return supported currencies', ()=>{
        const res = lib.getCurrencies();

        // Too general
        expect(res).toBeDefined();
        expect(res).not.toBeNull();

        // Too Specific
        expect(res[0]).toBe('USD');
        expect(res[1]).toBe('AUD');
        expect(res[2]).toBe('EUR');
        expect(res.length).toBe(3);

        // Proper way
        expect(res).toContain('USD');
        expect(res).toContain('AUD');
        expect(res).toContain('EUR');

        // Ideal way
        expect(res).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});

// Testing Objects
describe('getProduct', ()=> {
    it('should return an object', ()=>{
        const res = lib.getProduct(1);
        expect(res).toEqual({id: 1, price: 10});
        expect(res).toMatchObject({id: 1, price: 10});
    });
});

// Testing Exceptions
describe('registerUser', ()=>{
    it('should throw error if username is falsy', ()=>{
        const args = [null,undefined,false,'',0];
        args.forEach(a => {
            expect(()=> { lib.registerUser(a) }).toThrow();
        });
    });

    it('should return user object', ()=>{
        const res = lib.registerUser('romio');
        expect(res).toMatchObject({ username: 'romio'});
        expect(res.id).toBeGreaterThan(0);
    });
});

// Object Interaction Testing(using Mock Function)
describe('notifyCustomer', ()=>{
    it('should send an email to the customer',()=>{
        // db.getCustomerSync = function(customerId) {
        //     return {email: 'a' };
        // }
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a' });

        let mailSent = false;
        mail.send = function(email,message) {
            mailSent = true;
        }

        lib.notifyCustomer({customerId: 1});

        expect(mailSent).toBe(true);
    });
});