
var TrophiesActionsController = {

  velocity: TROPHY.ABSORB_VELOCITY,
  sprites: [],
  currentTrophies: null,

  add: function(sprite) {

    this.sprites.push(sprite);

  },

  changeCurrentTrophies: function(trophies) {

    this.currentTrophies = trophies;

  },

  moveToCharacter: function(character) {

    if (this.currentTrophies == null)
      return ;
    
    var characterX = character.getPosition().x;
    var characterY = character.getPosition().y + CHARACTER.SPRITE_HEIGHT / 2;

    var trophiesY = this.currentTrophies.getPosition().y;
    characterY -= trophiesY;

    for (var i = 0; i < this.sprites.length; ++i) {

      var spriteX = this.sprites[i].getPosition().x;
      var spriteY = this.sprites[i].getPosition().y;

      var xDistance = characterX - spriteX;
      var yDistance = characterY - spriteY;
      var distance  = Math.sqrt(yDistance * yDistance + xDistance * xDistance);
      xDistance /= distance;
      yDistance /= distance;

      var spriteAimX = spriteX + this.velocity * xDistance;
      var spriteAimY = spriteY + this.velocity * yDistance;

      this.sprites[i].setPosition(cc.ccp(spriteAimX, spriteAimY));

      if (new Utils.Rect(TROPHY.REMOVE_BUFFERX, TROPHY.REMOVE_BUFFERY).isContain(spriteAimX - characterX, spriteAimY - characterY)) {

        this.sprites[i].isGot = true;
        this.sprites[i].runAction(cc.Sequence.create(
          cc.ScaleTo.create(TROPHY.SCALE_TIME, TROPHY.SCALE),
          cc.ScaleTo.create(TROPHY.SCALE_TIME, 0)
        ));
        this.sprites[i].runAction(cc.FadeOut.create(TROPHY.FADEOUT_TIME));
        this.remove(i);
        
      }        
        
    }

  },

  remove: function(index) {

    this.sprites.deleteElementByIndex(index);

  },

  reset: function() {

    this.sprites = [];
    this.currentTrophies = null;
    this.velocity = TROPHY.ABSORB_VELOCITY;

  },

};