
var LightCircle = cc.Layer.extend({

  lightPoints: [],
  lightPointsSrc: [ P_LIGHT_POINT_1, P_LIGHT_POINT_2, P_LIGHT_POINT_3, P_LIGHT_POINT_4 ],

  ctor: function() {

    this.setAnchorPoint(cc.ccp(0, 0));
    this.setPosition(cc.ccp(0, 0));

    for (var i = 0; i < 20; ++i) {

      var lightPoint = cc.Sprite.create(this.lightPointsSrc[Math.floor(Math.random()*4)]);
      lightPoint.setAnchorPoint(cc.ccp(0.5, 0.5));
      lightPoint.setIsVisible(false);

      this.lightPoints.push(lightPoint);
      this.addChild(lightPoint, 100);

    }

  },

  evolve: function(character, flag) {

    if (typeof flag.isGotProperty === 'undefined' || !flag.isGotProperty)
      return;

    var lightPoint, theta, rand;
    for (var i = 0; i < this.lightPoints.length ; ++i) {

      lightPoint = this.lightPoints[i];

      lightPoint.setPosition(cc.ccp(character.getPosition().x, WIN_SIZE.height / 4));
      lightPoint.setIsVisible(true);

      rand = Math.random() / 3;
      theta = 2 * Math.PI * i / 12;

      lightPoint.runAction(cc.MoveBy.create(rand, cc.ccp(
        (40 + rand * 260) * Math.sin(theta), 
        (40 + rand * 260) * Math.cos(theta)
      )));
      //lightPoint.runAction(cc.ScaleTo.create(0.5 + rand, 2));
      lightPoint.runAction(cc.RotateBy.create(0.5 + rand, 360));
      //this.lightPoint.runAction(cc.MoveBy.create(0.1, cc.ccp(0, -60)));
      //lightPoint.runAction(cc.MoveBy.create(0.2, cc.ccp(200*rand, 200*rand)));
      lightPoint.runAction(cc.FadeOut.create(0.5 + rand));

      setTimeout((function(lightPoint) {
        return function() {
          lightPoint.setIsVisible(false);
        }
      })(lightPoint), 700);

    }
    
  },

});

LightCircle.create = function() {

  var sg = new LightCircle();
  if (sg) {
    return sg;
  }
  return null;

};