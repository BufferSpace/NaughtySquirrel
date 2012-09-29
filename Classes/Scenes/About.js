var About = cc.Layer.extend({

  content: null,
  menu: null,

  init: function() {

    if (this._super) {
      this.loadBg();
       this.loadLabel();
    }

    return true;
    
  },

  loadBg: function() {

    this.addPic(P_MENUBG, cc.ccp(0.5, 0.5), cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 2), 1, -1);
    this.addPic(P_ABOUT_PAGE, cc.ccp(0.5, 0.5), cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 2), 1, 10);

  },

  //add picture
  addPic: function(src, anchorPoint, position, scale, zOrder) {

    var sprite = cc.Sprite.create(src);
    sprite.setAnchorPoint(anchorPoint);
    sprite.setPosition(position);
    sprite.setScale(scale)
    this.addChild(sprite, zOrder, this.intemTag);
    this.intemTag++;

  },

  goBack: function() {

    var scene = cc.Scene.create();
    scene.addChild(MainMenu.create());
    cc.Director.sharedDirector().replaceScene(scene);

  },

  //load label
  loadLabel: function() {

    var goToMainMenuNormal   = cc.Sprite.create(P_MENU, cc.RectMake(800, 0, 200, 50));
    var goToMainMenuSelected = cc.Sprite.create(P_MENU, cc.RectMake(800, 50, 200, 50));
    var goToMainMenuDisabled = cc.Sprite.create(P_MENU, cc.RectMake(800, 50 * 2, 200, 50));

    var goToMainMenu = cc.MenuItemSprite.create(
      goToMainMenuNormal, 
      goToMainMenuSelected, 
      goToMainMenuDisabled, 
      this, 
      this.goBack
    );

    this.menu = cc.Menu.create(goToMainMenu);
    this.menu.alignItemsVerticallyWithPadding(10);
    this.menu.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height / 7));
    this.addChild(this.menu, 500, 2);

  },

});

About.create = function() {

  var sg = new About();
  if (sg && sg.init()) {
    return sg;
  }
  return null;

};

About.scene = function() {

  var scene = cc.Scene.create();  
  var layer = About.create(); 
  scene.addChild(layer);
  return scene;

};
