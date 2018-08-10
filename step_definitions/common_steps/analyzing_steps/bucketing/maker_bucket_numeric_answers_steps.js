module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^user deletes the following numeric buckets:$/, function (bucketsToDelete, cb) {
		var bucketLineClass = by.css('.spec-bucket-numeric-line');
		var bucketsIndex = bucketsToDelete.rows();

		element.all(bucketLineClass).then(function (items) {
			for (var i = 0; i < bucketsIndex.length; i++) {
				var _element = items[parseInt(bucketsIndex[i][0]) - 1];
				brw.actions().mouseMove(_element).mouseMove(_element.element(by.css('.spec-bucket-numeric-delete'))).click().perform();
			}
		}).then(cb);
	});

	When(/^user deletes all numeric buckets$/, function (cb) {
		var bucketLineClass = by.css('.spec-bucket-numeric-line');
		element.all(bucketLineClass).then(function (items) {
			items.forEach(function (ele, i, a) {
				brw.actions().mouseMove(a[i]).mouseMove(a[i].element(by.css('.spec-bucket-numeric-delete'))).click().perform();
			});
		}).then(cb);
	});

	When(/^user creates (\d+) numeric buckets separated by (\d+) px$/, function (numberOfBuckets, px, cb) {
		brw.findElement(by.css('.spec-bucket-numeric-graph')).then(function (bucketGraph) {
			for (var i = 0; i < numberOfBuckets; i++) {
				var pos = px * (i + 1);
				logger.log(pos);
				brw.actions().mouseMove(bucketGraph).mouseMove({
					x: -638,
					y: 0
				}).mouseMove({
					x: pos,
					y: 0
				}).click().perform();
			}
		}).then(cb);
	});
};