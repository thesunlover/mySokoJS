define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var joinInterior = function(tiles){
		this.interiorContainer = new createjs.Container();
		_.flatten(tiles, true).forEach(function(tile){
			this.interiorContainer.addChild(tile);
		}.bind(this));
		this.interiorContainer.name = "interior";
		return this.interiorContainer;
	};

	return joinInterior;
});

