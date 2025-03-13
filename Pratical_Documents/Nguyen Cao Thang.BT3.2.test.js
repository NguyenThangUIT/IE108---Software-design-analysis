const { calculatePrice } = require('./price.calulator');

describe('calculatePrice', () => {
    test('should calculate the price correctly without discounts or delivery charges', () => {
        expect(calculatePrice(50, 1, false)).toBeCloseTo(50);
        expect(calculatePrice(100, 2, false)).toBeCloseTo(100);
        expect(calculatePrice(150, 5, false)).toBeCloseTo(150);
        expect(calculatePrice(199, 6, false)).toBeCloseTo(199);
        expect(calculatePrice(199.99, 4.99, false)).toBeCloseTo(199.99);
    });

    test('should apply 10% price reduction if price reaches 200 euros', () => {
        expect(calculatePrice(200, 1, false)).toBeCloseTo(180);
        expect(calculatePrice(250, 2, false)).toBeCloseTo(225);
        expect(calculatePrice(300, 3, false)).toBeCloseTo(270);
        expect(calculatePrice(350, 4, false)).toBeCloseTo(315);
        expect(calculatePrice(400, 4.99, false)).toBeCloseTo(360);
    });

    test('should apply delivery charges if weight exceeds 5 kg', () => {
        expect(calculatePrice(50, 5.01, false)).toBeCloseTo(55.01);
        expect(calculatePrice(75, 6, false)).toBeCloseTo(81);
        expect(calculatePrice(80, 7, false)).toBeCloseTo(87);
        expect(calculatePrice(90, 8, false)).toBeCloseTo(98);
        expect(calculatePrice(99.99, 9.99, false)).toBeCloseTo(109.98);
    });

    test('should apply free delivery charges if price exceeds 100 euros', () => {
        expect(calculatePrice(100.01, 5.01, false)).toBeCloseTo(100.01);
        expect(calculatePrice(150, 6, false)).toBeCloseTo(150);
        expect(calculatePrice(200, 7, false)).toBeCloseTo(180);
        expect(calculatePrice(250, 8, false)).toBeCloseTo(225);
        expect(calculatePrice(300, 9.99, false)).toBeCloseTo(270);
    });

    test('should apply 3% price reduction in reduced price if paid with credit card', () => {
        expect(calculatePrice(50, 1, true)).toBeCloseTo(48.5);
        expect(calculatePrice(100, 2, true)).toBeCloseTo(97);
        expect(calculatePrice(150, 3, true)).toBeCloseTo(145.5);
        expect(calculatePrice(199, 4, true)).toBeCloseTo(193.03);
        expect(calculatePrice(199.99, 4.99, true)).toBeCloseTo(193.99);
    });

    test('should apply 15% price reduction if price reaches 200 euros,'
        + 'paid with credit card, and weight is under 5 kg', () => {
        expect(calculatePrice(200, 1, true)).toBeCloseTo(170);
        expect(calculatePrice(250, 2, true)).toBeCloseTo(212.5);
        expect(calculatePrice(300, 3, true)).toBeCloseTo(255);
        expect(calculatePrice(350, 4, true)).toBeCloseTo(297.5);
        expect(calculatePrice(400, 4.99, true)).toBeCloseTo(340);
    });

    // Other combinations: Add other combinations (if any) and its test cases
    test('should apply 10% price reduction and an additional 3% reduction if price reaches 200 euros,' + 'paid with credit card, and weight is 5 kg or more', () => {
        expect(calculatePrice(200, 5, true)).toBeCloseTo(174.6);
        expect(calculatePrice(250, 6, true)).toBeCloseTo(218.25);
        expect(calculatePrice(300, 7, true)).toBeCloseTo(261.9);
        expect(calculatePrice(350, 8, true)).toBeCloseTo(305.55);
        expect(calculatePrice(400, 9.99, true)).toBeCloseTo(349.2);
});

});
//Made by Nguyen Cao Thang - Student ID: 22521329