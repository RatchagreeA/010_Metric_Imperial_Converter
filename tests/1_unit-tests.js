const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function converHandler.getNum(input)', function() {
        
        test("1: Whole number input", function(done){
            let input = '1L';
            assert.equal(convertHandler.getNum(input), 1)
            done();
        })

        test("2: decimal number input", function(done){
            let input = '1.5L';
            assert.equal(convertHandler.getNum(input), 1.5)
            done();
        })
        
        test("3: fractional input", function(done){
            let input = '1/2L';
            assert.equal(convertHandler.getNum(input), 1/2)
            done();
        })
        
        test("4: fractional input with a decimal", function(done){
            let input = '1.2/2L';
            assert.equal(convertHandler.getNum(input), 1.2/2)
            done();
        })
        
        test("5: error on a double-fraction", function(done){
            let input = '3/2/3L';
        assert.equal(convertHandler.getNum(input), undefined)
        done();
        })
        
        test("6: default to a numerical input ", function(done){
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1)
            done();
        })
    })
    
    suite('Function converHandler.getUnit(input)', function() {

        test("7: read each valid input unit", function(done){
            let output = ["gal","L","mi","km","lbs","kg"];
            let input = output.map((unit) => unit.toUpperCase())
            input.forEach( (str, idx) => {
                assert.equal(convertHandler.getUnit(str), output[idx])
            })
            done();
        })
        
        test("8: error for an invalid input unit", function(done){
            let input = '3/2/3min';
            assert.equal(convertHandler.getUnit(input), undefined)
            done();
        })
    })
    
    suite('Function converHandler.getReturnUnit(input)', function() {

        test("9: return unit for each valid input unit", function(done){
            let input = { gal: "L", L: "gal", mi: "km", km: "mi" ,lbs: "kg", kg: "lbs" }
            Object.entries(input).forEach(entry => {
                const [key, value] = entry;
                assert.equal(convertHandler.getReturnUnit(key), value)
            });
            done();
        })
    })
    
    suite('Function converHandler.spellOutUnit(input)', function() {

        test("10: return the spelled-out string unit for each valid input unit", function(done){
            let input = { gal: "gallons", L: "liters", mi: "miles", km: "kilometers" ,lbs: "pounds", kg: "kilograms" }
            Object.entries(input).forEach(entry => {
                const [key, value] = entry;
                assert.equal(convertHandler.spellOutUnit(key), value)
            });
            done();
        })
    })
    
    suite('Function converHandler.convert(initNum, initUnit)', function() {

        test("11: convert gal to L", function(done){
            let [initNum, initUnit] = ['1', 'gal'];
            assert.equal(convertHandler.convert(initNum, initUnit), 3.78541)
            done();
        })
        
        test("12: convert L to gal", function(done){
            let [initNum, initUnit] = ['3.78541', 'L'];
            assert.equal(convertHandler.convert(initNum, initUnit), 1)
            done();
        })
        
        test("13: convert mi to km", function(done){
            let [initNum, initUnit] = ['1', 'mi'];
            assert.equal(convertHandler.convert(initNum, initUnit), 1.60934)
            done();
        })
        
        test("14: convert km to mi", function(done){
            let [initNum, initUnit] = ['1.60934', 'km'];
            assert.equal(convertHandler.convert(initNum, initUnit), 1)
            done();
        })
        
        test("15: convert lbs to kg", function(done){
            let [initNum, initUnit] = ['1', 'lbs'];
            assert.equal(convertHandler.convert(initNum, initUnit), 0.45359)
            done();
        })
        
        test("16: convert kg to lbs", function(done){
            let [initNum, initUnit] = ['0.45359', 'kg'];
            assert.equal(convertHandler.convert(initNum, initUnit), 1)
            done();
        })
        
    })

});