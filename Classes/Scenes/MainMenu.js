var MainMenu = cc.Layer.extend({

  intemTag: 0,
  menubg: null,

  init: function() {

    if (this._super) {
      this.Rendering();
      this.addMenu();
    }

    return true;

  },

  Rendering: function() {

    this.addPic(P_MENUBG, cc.ccp(0.5, 0.5), cc.ccp(WIN_SIZE.width / 2 , WIN_SIZE.height / 2), SCALE_RATE, -1);

    this.addPic(P_LOGO, cc.ccp(0, 0), cc.ccp(WIN_SIZE.width / 10, 3 * WIN_SIZE.height / 5), SCALE_RATE, 20);

  },



  addPic: function(src, anchorPoint, position, scale, zOrder) {

    var sprite = cc.Sprite.create(src);
    sprite.setAnchorPoint(anchorPoint);
    sprite.setPosition(position);
    sprite.setScale(scale)
    this.addChild(sprite, zOrder, this.intemTag);
    this.intemTag++;

  },

  //let the tile to go straight
  goStraight: function() {

    this.runAction(cc.MoveTo.create(this.distance / this.velocity, cc.PointMake(WIN_SIZE.width / 2, -this.height / 2)));

  },

  addMenu: function() {

    var newGameNormal   = cc.Sprite.create(P_MENU, cc.RectMake(0, 0, 200, 50));
    var newGameSelected = cc.Sprite.create(P_MENU, cc.RectMake(0, 50, 200, 50));
    var newGameDisabled = cc.Sprite.create(P_MENU, cc.RectMake(0, 50 * 2, 200, 50));

    var gameSettingsNormal   = cc.Sprite.create(P_MENU, cc.RectMake(200, 0, 200, 50));
    var gameSettingsSelected = cc.Sprite.create(P_MENU, cc.RectMake(200, 50, 200, 50));
    var gameSettingsDisabled = cc.Sprite.create(P_MENU, cc.RectMake(200, 50 * 2, 200, 50));

    var aboutNormal   = cc.Sprite.create(P_MENU, cc.RectMake(400, 0, 200, 50));
    var aboutSelected = cc.Sprite.create(P_MENU, cc.RectMake(400, 50, 200, 50));
    var aboutDisabled = cc.Sprite.create(P_MENU, cc.RectMake(400, 50 * 2, 200, 50));

    var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this, this.onNewGame);
    var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
    var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

    var menu = cc.Menu.create(newGame, gameSettings, about);
    menu.alignItemsVerticallyWithPadding(10);
    menu.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 2 - 80));
    this.addChild(menu, 600, 2);

  },

  onNewGame: function(pSender) {

    var scene = cc.Scene.create();
    scene.addChild(Track.create());
    cc.Director.sharedDirector().replaceScene(scene);

  },

  onSettings: function(pSender) {


    // var scene = cc.Scene.create();
    // scene.addChild(SettingsLayer.create());
    //  cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));

  },

  onAbout: function(pSender) {

    var scene = cc.Scene.create();
    scene.addChild(About.create());
    cc.Director.sharedDirector().replaceScene(scene);

  },

  onButtonEffect: function() {

    // if (global.sound) {
    //     var s = cc.AudioManager.sharedEngine().playEffect(s_buttonEffect);
    // }

  }

});

MainMenu.create = function() {

  var sg = new MainMenu();
  if (sg && sg.init()) {
    return sg;
  }
  return null;

};

MainMenu.scene = function() {

  var scene = cc.Scene.create();  
  var layer = MainMenu.create(); 
  scene.addChild(layer);
  return scene;

};
