function numUnitSplitter(input) {
  let matchNum = input.match(/^[\d.\/]*(?=[A-Za-z])/g) || [undefined]
  let matchUnit = input.match(/[A-Za-z].*$/g) || [undefined]
  matchNum = ( matchNum[0] === "") ? ['1'] : matchNum
  let [ rawNum, rawUnit ] = [ matchNum[0], matchUnit[0] ]  
  return {rawNum, rawUnit}
}
function isValidNum(numString) {
  if (!numString || numString == ".") {
    return false
  }
  let matchNum = numString.match(/^\d*\.?\d*((?<!\.)\/\d+\.?\d*)?$/g) || []
  if (matchNum.length != 1) {
    return false
  }
  return true
}
function isValidUnit(unit) {
  let validUnit = { gal: "L", l: "gal", mi: "km", km: "mi" ,lbs: "kg", kg: "lbs" }
  return !!validUnit[unit.toLowerCase()]
}
function calNum(numString) {
  let nums = numString.split("/")
  let num1 = nums[0]
  let num2 = nums[1] || "1"
  let result = parseFloat(num1) / parseFloat(num2)
  return result
}
function getNumUnit(input) {
  let {rawNum, rawUnit} = numUnitSplitter(input)
  let num = undefined
  let unit = undefined
  if ( isValidNum(rawNum) ) {
    num = calNum(rawNum)
  }
  if ( isValidUnit(rawUnit) ) {
    unit = rawUnit
  }
  return {num, unit}
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let { num } = getNumUnit(input)
    return num;
  };
  
  this.getUnit = function(input) {
    let { unit } = getNumUnit(input)
    if (!unit) return undefined
    let validUnit = { gal: "gal", l: "L", mi: "mi", km: "km" ,lbs: "lbs", kg: "kg" }
    return validUnit[unit.toLowerCase()]
  };
  
  this.getReturnUnit = function(initUnit) {
    let validUnit = { gal: "L", l: "gal", mi: "km", km: "mi" ,lbs: "kg", kg: "lbs" }
    return validUnit[initUnit.toLowerCase()]
  };

  this.spellOutUnit = function(unit) {
    let validUnit = { gal: "gallons", l: "liters", mi: "miles", km: "kilometers" ,lbs: "pounds", kg: "kilograms" }
    return validUnit[unit.toLowerCase()]
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let cnvUnitConst = { gal: galToL, l: 1/galToL, mi: miToKm, km: 1/miToKm, lbs: lbsToKg, kg: 1/lbsToKg }
    let result = initNum * cnvUnitConst[initUnit.toLowerCase()];
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
