const lib = require('../lib');

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