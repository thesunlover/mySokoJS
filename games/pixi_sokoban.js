define(function(require) {
	var Levels = require("games/sokoban/levels");
	var Room  = require("games/sokoban/pixi_room");
	var Stage  = require("libs/custom_stage");
	var Handlers = require("games/sokoban/pixi_handlers");
	var CommandList = require("games/sokoban/commandList");
    var PIXI        = require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this);
        this.setAutoFit({W:200,H:350});
        this.resize();
		this.addChild(PIXI.Sprite.fromFrame("player_normal"));
		this.init();
	};

	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.init = function() {
		this.commandList = new CommandList();
		this.handlers = new Handlers(this, this.commandList);
		this.levels = new Levels(function(){
			this.start();
		}.bind(this));
		this.levels.load();
	};

	Sokoban.prototype.start = function() {
		this.currentRoom = this.addChild(new Room(this.levels.getLevelData()));

		this.setAutoFit(this.currentRoom);
		this.resize();

		this.commandList.reset(this.currentRoom.records);
		this.handlers.refresh(this.currentRoom);
		var that = this;
		var solveCheck = setInterval(function(){
			if ( that.currentRoom.logic.checkForSolved() ){
				clearInterval(solveCheck);
				setTimeout(function(){
					that.removeChild(that.currentRoom);
					that.levels.markAsSolved();
					that.start();
				},1000);
			};
		}, 500);
	};

	return Sokoban;
});

