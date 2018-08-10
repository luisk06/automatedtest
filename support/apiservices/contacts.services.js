'use strict';

var ContactsService = function() {

	this.getAll = function() {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/addressbook?'
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getAll function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.create = function(_contact) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/addressbook',
				data: _contact,
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in getAll function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.update = function() {

	};

	this.deleteAllContacts = function() { // Also delete all tags
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/addressbook/user',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in getAll function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.getAllTags = function() {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/addressbooktags'
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getAllTags function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.createTag = function(_name) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/addressbooktags',
				data: { 'name': _name },
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in createTag function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.updateTag = function() {

	};

	this.deleteTags = function(_tags) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				data: { addressbooktagsids: _tags },
				url: '/api/addressbooktags',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in deleteTags function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};
};

module.exports = new ContactsService();
