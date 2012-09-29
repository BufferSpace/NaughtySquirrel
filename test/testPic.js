var testPic = cc.Layer.extend({

  intemTag: 0,
  menubg: null,
  
  init: function() {

    if (this._super) {
	 
	  var sprite = cc.Sprite.create(P_TILE_1);
      sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
      sprite.setPosition(cc.ccp(WIN_SIZE.width / 2, WIN_SIZE.height  * 2));
      this.addChild(sprite, 1, 1);
	  
	  sprite.runAction(
		cc.MoveBy.create(7, cc.ccp(0, -WIN_SIZE.height * 4))
	  );
	 
    }

    return true;

  },

});

testPic.create = function() {

  var sg = new testPic();
  if (sg && sg.init()) {
    return sg;
  }
  return null;

};

testPic.scene = function() {

  var scene = cc.Scene.create();  
  var layer = testPic.create(); 
  scene.addChild(layer);
  return scene;

};
