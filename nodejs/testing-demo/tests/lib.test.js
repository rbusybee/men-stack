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
