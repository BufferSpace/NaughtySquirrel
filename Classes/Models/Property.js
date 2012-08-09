/*
 *  the Property sprite
 */

var Property = cc.Layer.extend({

  position: null,
  propertyInformation: null,
  distance: null,
  route: 0,
  goStraightAction: null,

  propertySprite: null,
  propertyBgSprite: null,

  ctor: function(route, type) {

    this.route = route;
    this.propertyInformation = PropertiesInformation(type); 
    this._super();

    this.propertySprite = cc.Sprite.create(this.propertyInformation.src);
    this.addChild(this.propertySprite);

    this.propertyBgSprite = cc.Sprite.create(this.propertyInformation.bgSrc);
    this.propertyBgSprite.setIsVisible(false);
    this.addChild(this.propertyBgSprite);

    this.setAnchorPoint(cc.ccp(PROPERTY.ANCHORPOINT.X, PROPERTY.ANCHORPOINT.Y));
    this.setPosition(this.generatePosition());

    this.distance = WIN_SIZE.height + TILE.SIZE;

  },

  goStraight: function() {

    this.goStraightAction = this.runAction(
      cc.MoveTo.create(
        this.distance / LevelController.velocity, 
        cc.ccp(TRACK.LEFT_COORDINATE + this.route * ROUTE.WIDTH, - TILE.SIZE * 3 / 4)
      )
    );

  },

  turnLeft: function() {
    
    return true;
  
  },

  turnRight: function() {

    return true;

  },

  generatePosition: function() {

    return cc.ccp(TRACK.LEFT_COORDINATE + this.route * ROUTE.WIDTH, WIN_SIZE.height + TILE.SIZE / 4); 

  },

  isGot: function(character) {

    var characterX = character.getCurrentRoute();
    var characterY = character.getPosition().y;

    if (characterX != this.route)
      return false;

    var distance = this.getPosition().y - characterY; 
    if (new Utils.Range(-TROPHY.GET_BUFFERY, TROPHY.GET_BUFFERY).isContain(distance) && 
        character.isRunning())
      return true;

  },

  activate: function() {

    this.propertySprite.setIsVisible(false);

    this.propertyBgSprite.setPosition(cc.ccp(0, 2 * CHARACTER.SPRITE_HEIGHT));
    this.propertyBgSprite.setIsVisible(true);
    this.propertyBgSprite.runAction(cc.ScaleTo.create(0.5, 3));
    this.propertyBgSprite.runAction(cc.FadeOut.create(1));

  },

  decorate: function(type) {

    return this.propertyInformation.decorate(type);

  },

  updateLife: function() {

    this.propertyInformation.life--;

  },

  pause: function() {

    this.stopAction(this.goStraightAction);

  },

  resume: function() {

    this.distance = TILE.SIZE * 3 / 4 + this.getPosition().y;
    this.goStraightAction = cc.MoveTo.create(
      this.distance / LevelController.velocity, 
      cc.ccp(TRACK.LEFT_COORDINATE + this.route * ROUTE.WIDTH, - TILE.SIZE * 3 / 4)
    );
    this.runAction(this.goStraightAction);

  },


});

Property.create = function(route, type) {

  var sg = new Property(route, type);

  if (sg) return sg;
  return null;

};
