/*
 *  the trophy sprite
 */

var Trophy = cc.Sprite.extend({

  position: null,			      
  trophyInformation: null,  

  ctor: function(type, pos) {

    //this.trophyInformation = TrophyInformation(type); //get trophy information according to type 
    this.trophyInformation = type;
    this._super();
    
    this['isGot'] = false;
    this.initWithFile(this.trophyInformation.src);
    this.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.setPosition(pos);
    //this.setScale(SCALE_RATE);

    this.showTwink();

  },

  getValue: function() {

    return this.trophyInformation.value;

  },

  showTwink: function() {

    var characterTexture = cc.TextureCache.sharedTextureCache().addImage(this.trophyInformation.src);
    var w = TROPHY.SPRITE_WIDTH;
    var h = TROPHY.SPRITE_HEIGHT;

    var animation = cc.Animation.create();
    animation.addFrameWithTexture(characterTexture, cc.RectMake(0, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w * 2, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w * 3, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w * 4, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w * 5, 0, w, h));
    animation.addFrameWithTexture(characterTexture, cc.RectMake(w * 6, 0, w, h));

    this.action = cc.Animate.create(0.5, animation, true);
    this.runAction(cc.RepeatForever.create(this.action));

  }
  
});

Trophy.create = function(type, pos) {

  var sg = new Trophy(type, pos);

  if (sg) return sg;
  return null;

};
