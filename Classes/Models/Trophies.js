/**
 *  the Trophies layer
 */

var Trophies = cc.Layer.extend({

  route: null,
  trophies: null, 
  goStraightAction: null,  

  ctor: function(trophies, trophyType) {

    this._super();
    this.route = trophies.route;
    this.trophies = trophies.pos;

    this.trophieSprites = [];

    this.setContentSize(WIN_SIZE.width, TILE.SIZE);
    this.setAnchorPoint(cc.ccp(0, 0));
    this.setPosition(cc.ccp(-WIN_SIZE.width / 2, -TILE.SIZE / 2));

    for (var i = 0; i < this.trophies.length - 1; ++i) {

      var trophySprite = Trophy.create(trophyType, this.trophies[i]);
      this.addChild(trophySprite, Z_ORDER.TROPHY, i);

    }

    return true;

  },

  getCurrentRoute: function() {
  
    return this.route;

  },

  getTrophy: function(character, tile) {

    var characterY = character.getPosition().y + CHARACTER.SPRITE_HEIGHT / 2;
    var characterX = character.getCurrentRoute();

    var offset = TILE.SIZE / ( MAX_TROPHY_NUM + 1 );

    var sprites = this.getChildren();

    if (null != sprites) {

      for (var i = 0; i < sprites.length; ++i) {

        var trophyY = tile.getPosition().y - TILE.SIZE / 2 + sprites[i].getPosition().y;

        var distanceY = characterY - trophyY;
        var distanceX = characterX - this.route;
        
        if (character.getTrophyBufferRect().isContain(distanceX, distanceY) &&
            character.isRunning() && 
            !sprites[i].isGot) {

            TrophiesActionsController.add(sprites[i]);
            sprites[i].isGot = true;
              
              return sprites[i];

        }

      }

    }

    return 0;

  },

});

Trophies.create = function(trophies, trophyType) {

  var sg = new Trophies(trophies, trophyType);

  if (sg) return sg;
  return null;

};
