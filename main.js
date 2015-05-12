define(function(require){
    require("libs/zepto.min");

    var CustomLoader = require("libs/loader");
    var Sokoban        = require("games/pixi_sokoban");

    new CustomLoader({resources:[
        "img/sprite.json",
        ], onComplete: function(){
            window.app = new Sokoban();
        }
    });
});
