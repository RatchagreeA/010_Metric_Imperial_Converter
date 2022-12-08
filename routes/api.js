'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req,res) {
    let input = req.query.input
    let initNum  = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    if (!initNum && !initUnit) {
      return res.send("invalid number and unit")
    }
    if (!initNum) {
      return res.send("invalid number")
    }
    if (!initUnit) {
      return res.send("invalid unit")
    }
    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    let resJson = { initNum, initUnit, returnNum, returnUnit, string }
    res.json(resJson)
  })

};
