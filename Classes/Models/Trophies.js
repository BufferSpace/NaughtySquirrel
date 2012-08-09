/**
 *  the Trophies layer
 */

var Trophies = cc.Layer.extend({

  route: null,
  trophies: null, 
  goStraightAction: null,  

  //ctor function
  ctor: function(trophies, trophyType) {

    this._super();
    this.route = trophies.route;
    this.trophies = trophies.pos;

    this.trophieSprites = [];
    this.setAnchorPoint(cc.ccp(TROPHIES.ANCHORPOINT.X, TROPHIES.ANCHORPOINT.Y));
    this.setPosition(cc.ccp(LOCATION.TROPHIES.INIT.X, LOCATION.TROPHIES.INIT.Y));

    for (var i = 0; i < this.trophies.length - 1; ++i) {

      var trophySprite = Trophy.create(trophyType, this.trophies[i]);
      this.addChild(trophySprite, Z_ORDER.TROPHY, i);

    }

    return true;

  },

  turnLeft: function() {

    this.runAction(cc.Sequence.create(
      cc.RotateTo.create(TROPHIES.ROTATE_TIME, TROPHIES.ROTATE_ANGLE)
    ));

  },

  turnRight: function() {

    this.runAction(cc.Sequence.create(
      cc.RotateTo.create(TROPHIES.ROTATE_TIME, -TROPHIES.ROTATE_ANGLE)
    ));

  },

  getCurrentRoute: function() {

    return this.route;

  },

  goStraight: function() {

    this.goStraightAction = this.runAction(
      cc.MoveTo.create(
        (TILE.SIZE + WIN_SIZE.height) / LevelController.velocity, 
        cc.ccp(LOCATION.TROPHIES.MOVETO.X, LOCATION.TROPHIES.MOVETO.Y)
      )
    );

  },

  getTrophy: function(character) {

    var characterY = character.getPosition().y + CHARACTER.SPRITE_HEIGHT / 2;
    var characterX = character.getCurrentRoute();

    var offset = TILE.SIZE / ( MAX_TROPHY_NUM + 1 );

    var sprites = this.getChildren();

    if (null != sprites) {

      for (var i = 0; i < sprites.length; ++i) {

        //Calculate the distance between tile and character
        var trophyY = this.getPosition().y + sprites[i].getPosition().y;
        var crtAndTpDistanceY = characterY - trophyY;

        var crtAndTpDistanceX = characterX - this.route;
        
        if (character.getTrophyBufferRect().isContain(crtAndTpDistanceX, crtAndTpDistanceY) &&
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

  deleteSprite: function(sprite) {

    this.removeChild(sprite);

  },

  pause: function() {

    this.stopAction(this.goStraightAction);

  },

  resume: function() {

    this.distance = Math.abs(- TILE.SIZE - this.getPosition().y);
    this.goStraightAction = cc.MoveTo.create(
      this.distance / LevelController.velocity, 
      cc.ccp(LOCATION.TROPHIES.MOVETO.X, LOCATION.TROPHIES.MOVETO.Y)
    );
    this.runAction(this.goStraightAction);

  },

});

Trophies.create = function(trophies, trophyType) {

  var sg = new Trophies(trophies, trophyType);

  if (sg) return sg;
  return null;

};
