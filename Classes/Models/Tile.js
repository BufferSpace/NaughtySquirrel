/*
 *  the Tile sprite
 */

var Tile = cc.Layer.extend({

  distance: null,						
  turnDirection: ACTION.GO_STRAIGHT,	
  tileInformation: null,	      			
  isAboutToTurn: false,		      			
  isLoadedNext: false,		      			

  goStraightAction: null,

  tileBackground: null,
  trophies: null,
  property: null,

  ctor: function(type, index, offset, track) {

    this.tileInformation = TileInformation(type); 
    this._super();

    this.setContentSize(TILE.SIZE, TILE.SIZE);
    this.setAnchorPoint(cc.ccp(0.5, 0.5));

    if (index == 1) {

      this.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height));
      this.distance = TILE.SIZE / 2 + WIN_SIZE.height;

    } else {

      this.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height + TILE.SIZE / 2 + offset));
      this.distance = WIN_SIZE.height + TILE.SIZE + offset;

      this.trophies = Trophies.create(this.generateTrophies(), TrackInformation.basicTrophyType);
      this.addChild(this.trophies, Z_ORDER.TROPHIES, TROPHY.TAG_OFFSET + index);

      this.property = PropertiesController.generate(this.trophies);
      if (this.property)
        this.addChild(this.property, Z_ORDER.PROPERTY, PROPERTY.TAG_OFFSET + index);
       

    }

    this.tileBackground = cc.Sprite.create(this.tileInformation.src);
    this.tileBackground.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.tileBackground.setPosition(cc.ccp(0, 0));
    this.addChild(this.tileBackground, Z_ORDER.TILE, index);

    track.addChild(this, Z_ORDER.TILE, index);

    return true;

  },

  goStraight: function() {

    this.goStraightAction = cc.MoveTo.create(
      this.distance / LevelController.velocity, 
      cc.ccp(WIN_SIZE.width / 2, -TILE.SIZE / 2)
    );
    this.runAction(this.goStraightAction);

  },

  pause: function() {

    this.stopAction(this.goStraightAction);

  },

  resume: function() {

    this.distance = this.getPosition().y + TILE.SIZE / 2;
    this.goStraightAction = cc.MoveTo.create(
      this.distance / LevelController.velocity, 
      cc.ccp(WIN_SIZE.width / 2, -TILE.SIZE / 2)
    );
    this.runAction(this.goStraightAction);

  },

  isLoadNextTile: function() {

    if (WIN_SIZE.height >= this.getPosition().y + TILE.SIZE / 2 && 
        !this.isLoadedNext) {
      this.isLoadedNext = true;
      return true;

    }		

    return false;

  },

  isGameOver: function(character) {

    return !this.tileInformation.isValid(this, character);

  },

  isBounded: function(character) {

    return this.tileInformation.isBounded(this, character);

  },

  /*  
   * return the tile is valid to turn or not
   * the requirement are 
   *
   *   1.is turnable 
   *   2.turnDirection == ACTION.GO_STRAIGHT 
   *   3.character is in trun buffer 4.is about to turn 
   */
  isValidToRotate: function(turnDirection, character) {

    var distance = character.getPosition().y - this.getPosition().y;

    if (this.tileInformation.isTurnable() &&
        this.turnDirection == ACTION.GO_STRAIGHT &&
        TILE.TURN_BUFFER.isContain(distance) && 
        this.isAboutToTurn) {

      this.turnDirection = turnDirection;
      this.isAboutToTurn = false;
      return true;

    }

    return false;

  },

  aboutToTurn: function() {

    this.isAboutToTurn = true;

  },

  turnLeft: function() {

    // this.distance = this.getPosition().y + TILE.SIZE;
    this.runAction(cc.RotateTo.create(0.1, 90));

  },

  turnRight: function() {

    // this.distance = this.getPosition().y + TILE.SIZE;
    this.runAction(cc.RotateTo.create(0.1, -90));

  },

  scale: function() {
  },

  show: function() {
  },

  hide: function() {
  },

  generateTrophies: function() {

    return this.tileInformation.generateTrophies();

  },

  getTrophy: function(character) {

    if (this.trophies != null) 
      return this.trophies.getTrophy(character, this);

  },

  getProperty: function(character) {

    if (this.property != null && this.property.isGot(character, this)) {

      PropertiesController.add(this.property);

      this.property.activate();

      var self = this;
      setTimeout((function(property) {
        return function() {
          self.removeChild(property);
        };
      })(this.property), 1000);
      
      return true;

    }

    return false;

  },
  

});

Tile.create = function(type, index, offset, track) {

  var sg = new Tile(type, index, offset, track);
  if (sg) {
    return sg;
  }
  return null;

};
