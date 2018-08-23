'use strict';

const async = require('async');

var Do = function () {};

Do.prototype.cycle = function (param, cicleCb, errCb) {

    var func = null;

    if (typeof param === 'number') func = async.times;
    else if (typeof param === 'function') func = async.during;

    return func(param, cicleCb, errCb);

};

module.exports = new Do();