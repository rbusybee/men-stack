const lib = require('../lib');

test('absolute - should return +ve when input is +ve', () => {
    const res = lib.absolute(1);
    expect(res).toBe(1);
});

test('absolute - should return +ve when input is -ve', () => {
    const res = lib.absolute(-1);
    expect(res).toBe(1);
});

test('absolute - should return 0 when input is 0', () => {
    const res = lib.absolute(0);
    expect(res).toBe(0);
});