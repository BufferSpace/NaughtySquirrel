/**
 * The main game layer including: Tile, character, trophies.
 */

var Track = cc.Layer.extend({

  tiles: null,

  character: null,
  turnDirection: null,
               
  currentTile: null,
  nextTile: null,
  currentTileIndex: null,
  currentTheme: THEMES.THEME_1.NAME,

  trophyType: TrackInformation.basicTrophyType,

  scoreLayer: null, 
  pauseLayer: null,

  ctor: function() {

    this._super();

    RESET();

    this.initTiles();				
    this.loadFirstTile();			
    this.loadCharacter();			
    this.loadScoreLayer();
    this.loadPauseLayer();
    this.loadEnvironment();

    this.setIsTouchEnabled(true);   
    this.setIsKeypadEnabled(true);  
    this.scheduleUpdate();     

    return true;

  },

  initTiles: function() {

    this.tiles = [1, 1];
    this.currentTileIndex = 1;
    LevelController.generateTiles(18, this.currentTileIndex, this.tiles);

  },

  loadFirstTile: function() {

    this.currentTile = Tile.create(this.tiles[0], this.currentTileIndex, TILE.VELOCITY, this);
    this.currentTile.goStraight();

  },

  loadNextTile: function() {

    this.currentTileIndex++;

    /**
     * When loading the next tile, the current still moves. The triky thing that makes the problem
     * difficult is that in that little period of time, the distance that the current tile travels
     * is unpredictable, which leads a gap between the current tile and the next tile. The way to
     * solve the problem is that pause the movement of the current tile while the next tile is 
     * loading. Then after the next tile is successfully registered to the trackLayer, the current
     * tile resumes to straight.
     */
    this.currentTile.pause();

    /**
     * Calculates the offset between the current tile and the window height. After the current tile
     * travels under the buffer, the next tile is loaded. But it would be perfect to load the next
     * tile right above the current tile. So the offset is calculated.
     */
    var offset = this.currentTile.getPosition().y + TILE.SIZE / 2 - WIN_SIZE.height;
    this.nextTile = Tile.create(this.tiles[this.currentTileIndex], this.currentTileIndex, offset, this);

    /**
     * Since the next tile begins to go straight after the registration, the current tile can resume
     * to move now.
     */
    this.nextTile.goStraight();
    this.currentTile.resume();

    this.currentTheme = THEMES.getThemeByTileIndex(this.tiles[this.currentTileIndex]);

    LevelController.updateVelocity();
    LevelController.generateTiles(TILE.LOAD_DURATION, this.currentTileIndex, this.tiles);

    PropertiesController.updatePropertiesLife(this.trophyType, this.character);
    // BackgroundController.changeBackgrounds(this.currentTheme, this);

  },

  removePreviousTile: function() {

    if (this.currentTileIndex >= 3)
      this.removeChildByTag(this.currentTileIndex - 2);
      
  },

  loadCharacter: function() {

    this.character = Character.create();
    this.addChild(this.character, Z_ORDER.CHARACTER, CHARACTER.TAG);
    this.character.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 4));

  },

  loadScoreLayer: function() {

    this.scoreLayer = ScoreLayer.create();
    this.addChild(this.scoreLayer, Z_ORDER.SCORE_LAYER);

    this.scoreLayer.generatePanel([{
      type: 'trophies',
      position: cc.ccp(LOCATION.GAME_LAYER.TROPHIES.X, LOCATION.GAME_LAYER.TROPHIES.Y),
    }, {
      type: 'distance',
      position: cc.ccp(LOCATION.GAME_LAYER.DISTANCE.X, LOCATION.GAME_LAYER.DISTANCE.Y),
    }]);

  },

  loadPauseLayer: function() { 

    this.pauseLayer = PauseLayer.create(this.character);
    this.pauseLayer.setPosition(cc.ccp(0, 0));
    this.addChild(this.pauseLayer, Z_ORDER.PAUSE_BUTTON);

  },

  loadEnvironment: function() {

    var footprint = Footprints.create();
    var shadow = JumpShadow.create();
    var lightCircle = LightCircle.create();
    var sky = Sky.create();

    EnvironmentsController.addTo(footprint, this);
    EnvironmentsController.addTo(shadow, this);
    EnvironmentsController.addTo(lightCircle, this);
    EnvironmentsController.addTo(sky, this);

  },

  update: function() {
      
    if (this.isTimeToChangeCurrentTile())
      this.changeCurrentTile();

    if (this.currentTile.isValidToRotate(this.turnDirection, this.character))
      this.turnAction();

    if (this.isGameOver() != null)
      this.gameOver(this.isGameOver());
      
    if (this.currentTile.isLoadNextTile()) {

      this.loadNextTile();	
      this.removePreviousTile();

    }

    var isAboutToJump = this.character.jump(this.currentTile);   
    var isLanded = this.character.landDetection(this.currentTile); 

    this.scoreLayer.updateScores(this.currentTile.getTrophy(this.character));
    
    var isGotProperty = this.currentTile.getProperty(this.character);
    PropertiesController.updateActiveProperties(this.trophyType, this.character);
    
    TrophiesActionsController.moveToCharacter(this.character, this.currentTile);
    EnvironmentsController.evolve(this.character, {

      theme         : this.currentTheme,
      isGotProperty : isGotProperty,
      isLanded      : isLanded,
      isAboutToJump : isAboutToJump,

    });

  },

  isTimeToChangeCurrentTile: function() {

    if (this.nextTile != null && 
        this.nextTile.getPosition().y - TILE.SIZE / 2 < this.character.getPosition().y)
      return true;
    return false;

  },

  changeCurrentTile: function() {

    this.currentTile = this.nextTile;
    this.nextTile = null;

    TrophiesActionsController.changeCurrentTrophies(this.currentTile.trophies);

  },

  turnAction: function() {

    if (this.turnDirection == ACTION.TURN_LEFT) 
      this.currentTile.turnLeft();
    if (this.turnDirection == ACTION.TURN_RIGHT)
      this.currentTile.turnRight();

  },

  isGameOver: function() {

    var gameOverType = null;

    if (this.currentTile.isGameOver(this.character))
      gameOverType = GAMEOVER.TYPE.CROSS_BORDER;
    else if (this.character.isDied())
      gameOverType = GAMEOVER.TYPE.NO_HP;

    return gameOverType;
            
  },

  gameOver: function(type) {

    this.removeChild(this.scoreLayer);
  
    var scene = cc.Scene.create();
    scene.addChild(GameOver.create(this.scoreLayer, type));
    cc.Director.sharedDirector().replaceScene(scene);
                                                
  },

  /*ccTouchesEnded: function(touches, event) {  

    var distance = this.character.getPosition().y - this.currentTile.getPosition().y;
    var actionPermissions = this.currentTile.isBounded(this.character);

    if (WIN_SIZE.height * 5 / 6 < touches[0].locationInView().y && 
        touches[0].locationInView().y < WIN_SIZE.height)
       this.character.jump(this.currentTile);
    else if (0 < touches[0].locationInView().x && 
             touches[0].locationInView().x < WIN_SIZE.width / 2)
      this.keyLeftHandler(distance, actionPermissions);
    else if (WIN_SIZE.width / 2 < touches[0].locationInView().x && 
             touches[0].locationInView().x < WIN_SIZE.width)
      this.keyRightHandler(distance, actionPermissions);
    

  },*/

  keyDown: function(key) {

    KEYS = [];
    KEYS[key] = true;

  },

  keyUp: function() {

    var distance = this.character.getPosition().y - this.currentTile.getPosition().y;
    var actionPermissions = this.currentTile.isBounded(this.character);

    //with the Correct operation, set the turnDirection ACTION_TURN_LEFT or ACTION_TURN_RIGHT
    //with the Wrong operation, hp decrease
    if (KEYS[cc.KEY.left])		
      this.keyLeftHandler(distance, actionPermissions);	  
    if (KEYS[cc.KEY.right])
      this.keyRightHandler(distance, actionPermissions);
    if (KEYS[cc.KEY.up])
      this.keyUpHandler();

    //if press 'a', move left, 
    //if press 'd', move right
    if (KEYS[cc.KEY.a]) {
      if ((actionPermissions.ACTION_MOVE_LEFT && this.character.isRunning()) || 
          (actionPermissions.ACTION_JUMP_LEFT && this.character.isJumping()))
        this.character.moveLeft();
    }

    if (KEYS[cc.KEY.d]) {
      if ((actionPermissions.ACTION_MOVE_RIGHT && this.character.isRunning()) || 
          (actionPermissions.ACTION_JUMP_RIGHT && this.character.isJumping()))
        this.character.moveRight();
    }

  },

  keyLeftHandler: function(distance, actionPermissions) {

    // If the tile is straight, then there is no need for it to have a
    // turn buffer. The same as the keyRightHandler.
    if (this.currentTile.tileInformation.isTurnable() &&
        CHARACTER.TURN_BUFFER.isContain(distance)) {

      this.currentTile.aboutToTurn();
      this.turnDirection = ACTION.TURN_LEFT;

    } else {

      this.character.hpDecrease();
      if (actionPermissions.ACTION_MOVE_LEFT)
        this.character.moveLeftMost();

    }

  },

  keyRightHandler: function(distance, actionPermissions) {

    if (this.currentTile.tileInformation.isTurnable() &&
        CHARACTER.TURN_BUFFER.isContain(distance)) {

      this.currentTile.aboutToTurn();
      this.turnDirection = ACTION.TURN_RIGHT;

    } else {

      this.character.hpDecrease();
      if (actionPermissions.ACTION_MOVE_RIGHT)
        this.character.moveRightMost();

    }

  },

  keyUpHandler: function() {

    if (this.character.isRunning())
      this.character.changeStatus(CHARACTER.STATUS.ABOUT_TO_JUMP);

  },

});

Track.create = function() {

  var sg = new Track();
  if (sg && sg.init()) {
    return sg;
  }
  return null;

};

Track.scene = function() {

  var scene = cc.Scene.create();
  var layer = Track.create();
  scene.addChild(layer, 1, 1);
  return scene;

};
