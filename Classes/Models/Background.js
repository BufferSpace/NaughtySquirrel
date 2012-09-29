
/**
 * Background is like the track, which manipulates the background tiles
 * as the track manipulates the tiles. The main difference between them
 * is that the background is not turnable.
 */
var Background = cc.Layer.extend({

  backgroundTiles: null,

  currentBackgroundTile: null,
  nextBackgroundTile: null,
  
  // The index now is only used to generate the tag for the background,
  // which is less useful than the one in track.
  currentBackgroundTileIndex: null,

  scoreLayer: null, 
  pauseLayer: null,

  ctor: function(backgrounds) {

    this._super();

    this.backgroundTiles = backgrounds.copy();

    // RESET();
    this.loadFirstBackgroundTile();			
    this.scheduleUpdate();     

    return true;

  },

  loadFirstBackgroundTile: function() {

    this.currentBackgroundTileIndex = 1;
    this.currentBackgroundTile = BackgroundTile.create(
      this.backgroundTiles[Utils.Random.rangeInteger(0, this.backgroundTiles.length)], 
      this.currentBackgroundTileIndex, 
      TILE.VELOCITY
    );

    this.addChild(
      this.currentBackgroundTile, 
      Z_ORDER.BACKGROUND, 
      BACKGROUND.TAG + this.currentBackgroundTileIndex
    );
    this.currentBackgroundTile.goStraight();

  },

  loadNextBackgroundTile: function() {

    this.currentBackgroundTileIndex++;

    /**
     * When loading the next tile, the current still moves. The triky thing that makes the problem
     * difficult is that in that little period of time, the distance that the current tile travels
     * is unpredictable, which leads a gap between the current tile and the next tile. The way to
     * solve the problem is that pause the movement of the current tile while the next tile is 
     * loading. Then after the next tile is successfully registered to the trackLayer, the current
     * tile resumes to straight.
     */
    this.currentBackgroundTile.pause();

    /**
     * Calculates the offset between the current tile and the window height. After the current tile
     * travels under the buffer, the next tile is loaded. But it would be perfect to load the next
     * tile right above the current tile. So the offset is calculated.
     */
    var offset = this.currentBackgroundTile.getPosition().y + TILE.SIZE / 2 - WIN_SIZE.height;
    this.nextBackgroundTile = BackgroundTile.create(
      this.backgroundTiles[Utils.Random.rangeInteger(0, this.backgroundTiles.length)], 
      this.currentBackgroundTileIndex, 
      offset
    );

    this.addChild(
      this.nextBackgroundTile, 
      Z_ORDER.BACKGROUND, 
      BACKGROUND.TAG + this.currentBackgroundTileIndex
    );

    /**
     * Since the next tile begins to go straight after the registration, the current tile can resume
     * to move now.
     */
    this.nextBackgroundTile.goStraight();
    this.currentBackgroundTile.resume();

    this.currentBackgroundTile = this.nextBackgroundTile;

  },

  removePreviousBackgroundTile: function() {

    if (this.currentBackgroundTileIndex >= 2)
      this.removeChildByTag(BACKGROUND.TAG + this.currentBackgroundTileIndex - 2);
      
  },

  update: function() {
      
    if (this.currentBackgroundTile.isLoadNextBackgroundTile()) {

      this.loadNextBackgroundTile();	
      this.removePreviousBackgroundTile();

    }

  },

});

Background.create = function(backgrounds) {

  var sg = new Background(backgrounds);
  if (sg) return sg;
  return null;

};

