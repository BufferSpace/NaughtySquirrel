/*
 *  the character sprite
*/

var Character = cc.Layer.extend({

  currentRoute: ROUTE.MIDDLE,
  sources: [P_CHARACTER1, P_CHARACTER2, P_CHARACTER3],              
  hp: null,             

  status: CHARACTER.STATUS.RUNNING,

  jumpDistance: CHARACTER.JUMP_DISTANCE, 
  landingPosition: null,

  moveLeftAction: null,               
  moveRightAction: null,

  trophyBufferRect: null,
  trophyBufferX: TROPHY.GET_BUFFERX,
  trophyBufferY: TROPHY.GET_BUFFERY,

  animateId: null,

  characterSprite: null,
  hpDecreaseBg: null,
  hpIncreaseBg: null,

  ctor: function() {

    this._super();
    this.hp = CHARACTER.MAX_HP;

    this.hpDecreaseBg = cc.Sprite.create(P_HP_DOWN);
    this.hpDecreaseBg.setIsVisible(false);
    this.addChild(this.hpDecreaseBg);

    this.characterSprite = cc.Sprite.create(this.sources[2], 
      cc.RectMake(0, 0, CHARACTER.SPRITE_WIDTH, CHARACTER.SPRITE_HEIGHT));
    this.addChild(this.characterSprite);

    this.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 4));
    
    this.setTrophyBufferRect(this.trophyBufferX, this.trophyBufferY);

    this.runAnimate();
    
    return true;

  },

  runAnimate: function() {

    var w = CHARACTER.SPRITE_WIDTH;
    var h = CHARACTER.SPRITE_HEIGHT;
    var i = 0;

    var self = this;
    this.animateId = setInterval(function() {

      if (i == 8)
        i = 0;

      self.characterSprite.setTextureRect(cc.RectMake(w * i++, 0, w, h));

    }, CHARACTER.SPEED);

  },

  clearAnimate: function() {

    clearInterval(this.animateId);

  },

  setTrophyBufferRect: function(bufferX, bufferY) {

    this.TrophyBufferRect = new Utils.Rect(
      bufferX,
      bufferY
    );

  },

  getTrophyBufferRect: function() {

    return this.TrophyBufferRect;

  },

  getTrophyBuffer: function() {

    return {

      trophyBufferX: this.trophyBufferX,
      trophyBufferY: this.trophyBufferY,

    };

  },

  setSrc: function(index) {

    var characterTexture = cc.TextureCache.sharedTextureCache().addImage(this.sources[index]);
    this.characterSprite.setTexture(characterTexture);

  },

  hpDecrease: function() {

    this.hpDecreaseBg.setPosition(cc.ccp(0, CHARACTER.SPRITE_HEIGHT / 2));
    this.hpDecreaseBg.setIsVisible(true);
    this.hpDecreaseBg.runAction(cc.ScaleTo.create(0.5, 2));
    this.hpDecreaseBg.runAction(cc.FadeOut.create(1));

    this.hp--;
    if (this.hp >= 0)
      this.setSrc(this.hp);

  },

  isDied: function() {

    return this.hp == -1;

  },

  isValidToMove: function() {

    return true;

  },

  moveLeft: function() {

    this.removeMoveAction();
    this.currentRoute--;
    this.moveLeftAction = cc.MoveTo.create(
      ROUTE.WIDTH / CHARACTER.MOVE_VELOCITY, 
      cc.ccp(this.currentRoute * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, WIN_SIZE.height / 4)
    );
    this.runAction(this.moveLeftAction);

  },

  moveRight: function() {

    this.removeMoveAction();
    this.currentRoute++;
    this.moveRightAction = cc.MoveTo.create(
      ROUTE.WIDTH / CHARACTER.MOVE_VELOCITY, 
      cc.ccp(this.currentRoute * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, WIN_SIZE.height / 4)
    );

    this.runAction(this.moveRightAction);

  },

  moveLeftMost: function() {

    this.currentRoute = ROUTE.LEFT;
    this.removeMoveAction();
    this.moveLeftAction = cc.MoveTo.create(
      ROUTE.WIDTH * 3 / CHARACTER.MOVE_VELOCITY, 
      cc.ccp(ROUTE.LEFT * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, WIN_SIZE.height / 4)
    );

    this.runAction(this.moveLeftAction);

  },

  moveRightMost: function() {

    this.currentRoute = ROUTE.RIGHT;
    this.removeMoveAction();
    this.moveRightAction = cc.MoveTo.create(
      ROUTE.WIDTH * 3 / CHARACTER.MOVE_VELOCITY, 
      cc.ccp(ROUTE.RIGHT * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, WIN_SIZE.height / 4)
    );
    this.runAction(this.moveRightAction);

  },

  removeMoveAction: function() {

    if (this.moveRightAction != null) {

      this.stopAction(this.moveRightAction);

    }
    
    if(this.moveLeftAction != null) {

      this.stopAction(this.moveLeftAction);

    }

  },

  getCurrentRoute: function() {

    return this.currentRoute;

  },

  changeStatus: function(status) {

    this.status = status;

  },

  isJumping: function() {

    return this.status == CHARACTER.STATUS.JUMPING;

  },

  isRunning: function() {

    return this.status == CHARACTER.STATUS.RUNNING;
  
  },

  isAboutToJump: function() {

    return this.status == CHARACTER.STATUS.ABOUT_TO_JUMP;
    
  },

  //character's position relative to the position of tile(tile's center)
  jump: function(currentTile) {

    if (this.isAboutToJump()) {

      this.changeStatus(CHARACTER.STATUS.JUMPING);
      var distance = this.getPosition().y - (currentTile.getPosition().y - TILE.SIZE / 2);
      this.landingPosition = distance + this.jumpDistance;

      if (this.landingPosition > TILE.SIZE) 
        this.landingPosition -= TILE.SIZE;

      //Enlarge
      this.characterSprite.runAction(cc.Sequence.create(
        cc.ScaleTo.create( (this.jumpDistance / TILE.VELOCITY) / 2 ,2),
        cc.ScaleTo.create( (this.jumpDistance / TILE.VELOCITY) / 2 ,1)    
      ));

      return true;

    }

    return false;
    
  },

  landDetection: function(currentTile) {

    if (this.isJumping()) {

      var jumpingPosition = this.getPosition().y - (currentTile.getPosition().y - TILE.SIZE / 2);
      var landingRange = new Utils.Range(
        this.landingPosition - CHARACTER.LAND_BUFFER, 
        this.landingPosition + CHARACTER.LAND_BUFFER
      );

      if (landingRange.isContain(jumpingPosition)) {
        this.changeStatus(CHARACTER.STATUS.RUNNING);
        return true;
      }
        
    }

    return false;

  },

});

Character.create = function() {

  var sg = new Character();
  if (sg) {
    return sg;
  }
  return null;

};
