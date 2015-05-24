define(function(require) {
	var SokobanLogic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');
	var Handlers = require("games/sokoban/pixi_handlers");
	var Directions = require("games/sokoban/room/pixi_directions");

	
	var Room = function( level, callback ){
		PIXI.DisplayObjectContainer.call(this);
		this.player = null;
		this.grid = level.grid;
		this.parseTiles();
		this.setDimentions();


		this.logic = new SokobanLogic(this.player, this.interiorTiles);

		this.directions = this.addChild(new Directions(this.logic, this.rows, this.columns));
		this.directions.position.set(0, this.H);



		// that.currentLevel = this;
		// this.recordsBox = new Records();
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(this.recordsBox);
		this.handlers = new Handlers(this, callback);//includes the CommandList, need the Record

		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.x = this.W + 4;

		this.handlers.commandList.modified.add(this.infoBox.update.bind(this.infoBox));
	};

	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Object.defineProperties(Room.prototype, {
		"rows": {
			get: function() {
				return this.grid.length;
			}
		},
		"columns": {
			get: function() {
				return this.grid[0].length;
			}
		},
	});

	Room.prototype.parseTiles = function() {
		var that = this;
		this.interiorTiles = this.grid.map(function(row, iRow){
			return row.map(function(tileData, iColumn){
				var tile = that.addChild(new Tile(tileData));
				if (!that.player && tile.isPlayer()){
					that.player = tile;
				}
				return tile;
			});
		});
	};

	Room.prototype.setDimentions = function(){
		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;
	};

	return Room;
});

