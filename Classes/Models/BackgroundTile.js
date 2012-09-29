/**
 * BackgroundTile is much like tile, which has less behaviors than tile.
 */

var BackgroundTile = cc.Layer.extend({

  distance: null,
  isLoadedNext: false,		      			
  backgroundInformation: null,
  backgroundPicture: null,

  goStraightAction: null,

  ctor: function(type, index, offset) {

    this.backgroundInformation = BackgroundInformation(type);

    this._super();

    this.setContentSize(TILE.SIZE, TILE.SIZE);
    this.setAnchorPoint(cc.ccp(0.5, 0.5));

    if (index == 1) {

      this.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height));
      this.distance = TILE.SIZE / 2 + WIN_SIZE.height;

    } else {

      this.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height + TILE.SIZE / 2 + offset));
      this.distance = WIN_SIZE.height + TILE.SIZE + offset;

    }

    this.backgroundPicture = cc.Sprite.create(this.backgroundInformation.src);
    this.backgroundPicture.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.backgroundPicture.setPosition(cc.ccp(0, 0));
    this.addChild(this.backgroundPicture, Z_ORDER.BACKGROUND, index);

    return true;

  },

  goStraight: function() {

    this.goStraightAction = cc.MoveTo.create(
      this.distance / this.backgroundInformation.velocity, 
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
      this.distance / this.backgroundInformation.velocity, 
      cc.ccp(WIN_SIZE.width / 2, -TILE.SIZE / 2)
    );
    this.runAction(this.goStraightAction);

  },

  isLoadNextBackgroundTile: function() {

    if (WIN_SIZE.height >= this.getPosition().y + TILE.SIZE / 2 && 
        !this.isLoadedNext) {
      this.isLoadedNext = true;
      return true;

    }		

    return false;

  },

  scale: function() {
  },

  show: function() {
  },

  hide: function() {
  },

});

BackgroundTile.create = function(type, index, offset, track) {

  var sg = new BackgroundTile(type, index, offset, track);
  if (sg) {
    return sg;
  }
  return null;

};
