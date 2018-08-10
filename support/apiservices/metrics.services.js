'use strict';

var MetricService = function () {

    this.create = function (_appId, _metricObj) {
        var defer = protractor.promise.defer(),
            options = {
                method: 'POST',
                url: '/api/v3/app/' + _appId + '/metric',
                data: _metricObj,
                headers: { 'content-type': 'application/json' },
                json: true
            };

        rs.sendInfo(options, function (_resp) {
            try {
                return defer.fulfill(_resp);
            } catch (err) {
                return defer.reject();
            }
        });

        return defer.promise;
    };

    this.createMetric = function (_appId, _metricObj) {
        var defer = protractor.promise.defer(),
            _this = this;

        console.log('_appId', _appId);

        us.isLogged().then(function () {
            console.log('_metricObj', _metricObj);
            return _this.create(_appId, _metricObj);
        }).then(function () {
            defer.fulfill();
        }).catch(function () {
            defer.reject();
        });

        return defer.promise;
    };
};

module.exports = new MetricService();
