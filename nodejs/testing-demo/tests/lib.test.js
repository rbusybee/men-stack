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
    })
})