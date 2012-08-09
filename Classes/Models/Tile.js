/*
 *  the Tile sprite
 */

var Tile = cc.Sprite.extend({

  type: null,							  
  src: null,							  
  distance: null,						
  turnDirection: ACTION.GO_STRAIGHT,	
  tileInformation: null,	      			
  isAboutToTurn: false,		      			
  isLoadNexted: false,		      			

  goStraightAction: null,

  ctor: function(type, index, offset) {

    this.tileInformation = TileInformation(type); 
    this._super();
    this.initWithFile(this.tileInformation.src);
    this.setAnchorPoint(cc.ccp(TILE.ANCHORPOINT.X, TILE.ANCHORPOINT.Y));
    
    if (index == 1) {

      this.setPosition(cc.ccp(LOCATION.TILE.FIRST.X, LOCATION.TILE.FIRST.Y));
      this.distance = WIN_SIZE.height + TILE.SIZE / 2 ;

    } else {

      this.setPosition(cc.ccp(LOCATION.TILE.NOTFIRST.X, LOCATION.TILE.NOTFIRST.Y + offset));
      this.distance = WIN_SIZE.height + TILE.SIZE + offset;

    }

    return true;

  },

  //let the tile to go straight
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

  /*
    return is time to load next tile or not
    if has been load next tile, set isLoadNexted true
  */
  isLoadNextTile: function(buffer) {

    if (WIN_SIZE.height + buffer >= this.getPosition().y + TILE.SIZE / 2 && 
        !this.isLoadNexted) {
      this.isLoadNexted = true;
      return true;

    }		

    return false;

  },

  //return is gameover or not
  isGameOver: function(character) {

    return !this.tileInformation.isValid(this, character);

  },

  //return the tile is bounded or not
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

  //function use for mark the tile is about to turn
  aboutToTurn: function() {

    this.isAboutToTurn = true;

  },

  //function use for turn left
  turnLeft: function() {

    this.distance = this.getPosition().y + TILE.SIZE / 2;
    this.runAction(cc.Sequence.create(
      cc.RotateTo.create(0.1, 90)
    ));

  },

  //function use for turn right
  turnRight: function() {

    this.distance = this.getPosition().y + TILE.SIZE / 2;
    this.runAction(cc.Sequence.create(
      cc.RotateTo.create(0.1, -90)
    ));

  },

  scale: function() {
  },

  show: function() {
  },

  hide: function() {
  },

  //function use for generate trophies
  generateTrophies: function() {

    return this.tileInformation.generateTrophies();

  },

});

Tile.create = function(type, index, offset) {

  var sg = new Tile(type, index, offset);
  if (sg) {
    return sg;
  }
  return null;

};
