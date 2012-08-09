
var PauseLayer = cc.Layer.extend({
  
  pauseLayer: null,
  character: null,

  ctor: function(character) {

    this._super();
    
    this.character = character;
    this.loadButton();
    this.loadMenu();

  },

  onPause: function() {

    this.character.clearAnimate();
    cc.Director.sharedDirector().pause();
    this.menu.setIsVisible(true);

  },

  loadButton: function() {

    var pauseNormal   = cc.Sprite.create(P_PAUSE);
    var pauseSelected = cc.Sprite.create(P_PAUSE);
    var pauseDisabled = cc.Sprite.create(P_PAUSE);

    
    var goToPause = cc.MenuItemSprite.create(
      pauseNormal, 
      pauseSelected, 
      pauseDisabled, 
      this, 
      this.onPause
    );

    this.menu = cc.Menu.create(goToPause);
    this.menu.setPosition(cc.ccp(LOCATION.PAUSE.BUTTON.X, LOCATION.PAUSE.BUTTON.Y));
    this.addChild(this.menu, 500, 2);

  },

  onResumeGame: function() {

    this.character.runAnimate();
    cc.Director.sharedDirector().resume();
    this.menu.setIsVisible(false);
    TrackInformation.gameStatus = GAMESTATUS.PLAYING;

  },

  onNewGame: function() {

    var scene = cc.Scene.create();
    scene.addChild(Track.create());
    cc.Director.sharedDirector().replaceScene(scene);
    cc.Director.sharedDirector().resume();

  },

  onMainMenu: function(trophyType, character) {

    LevelController.reset();
    EnvironmentsController.reset();
    PropertiesController.updatePropertiesLife(this.trophyType, this.character, true);
    TrophiesActionsController.reset();

    var scene = cc.Scene.create();
    scene.addChild(MainMenu.create());
    cc.Director.sharedDirector().replaceScene(scene);
    cc.Director.sharedDirector().resume();

  },

  loadMenu: function() {

    var resumeGameNormal   = cc.Sprite.create(P_MENU, cc.RectMake(600, 0, 200, 50));
    var resumeGameSelected = cc.Sprite.create(P_MENU, cc.RectMake(600, 50, 200, 50));
    var resumeGameDisabled = cc.Sprite.create(P_MENU, cc.RectMake(600, 50 * 2, 200, 50));

    var gameSettingsNormal   = cc.Sprite.create(P_MENU, cc.RectMake(200, 0, 200, 50));
    var gameSettingsSelected = cc.Sprite.create(P_MENU, cc.RectMake(200, 50, 200, 50));
    var gameSettingsDisabled = cc.Sprite.create(P_MENU, cc.RectMake(200, 50 * 2, 200, 50));

    var goToMainMenuNormal   = cc.Sprite.create(P_MENU, cc.RectMake(800, 0, 200, 50));
    var goToMainMenuSelected = cc.Sprite.create(P_MENU, cc.RectMake(800, 50, 200, 50));
    var goToMainMenuDisabled = cc.Sprite.create(P_MENU, cc.RectMake(800, 50 * 2, 200, 50));

    var resumeGame   = cc.MenuItemSprite.create(
      resumeGameNormal, 
      resumeGameSelected, 
      resumeGameDisabled, 
      this, 
      this.onResumeGame
    );
    var gameSettings = cc.MenuItemSprite.create(
      gameSettingsNormal, 
      gameSettingsSelected, 
      gameSettingsDisabled, 
      this, 
      this.onSettings
    );
    var goToMainMenu = cc.MenuItemSprite.create(
      goToMainMenuNormal, 
      goToMainMenuSelected, 
      goToMainMenuDisabled, 
      this, 
      this.onMainMenu
    );

    this.menu = cc.Menu.create(resumeGame, gameSettings, goToMainMenu);
    this.menu.alignItemsVerticallyWithPadding(10);
    this.menu.setPosition(cc.ccp(LOCATION.PAUSE.LAYER.X, LOCATION.PAUSE.LAYER.Y));
    this.menu.setIsVisible(false);
    this.addChild(this.menu, 500, 2);

  },
  
});

PauseLayer.create = function(character) {

  var sg = new PauseLayer(character);

  if (sg) return sg;
  return null;

};