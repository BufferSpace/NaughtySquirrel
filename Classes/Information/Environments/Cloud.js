
var Cloud = cc.Sprite.extend({

  cloudSrc: [P_CLOUD_1, P_CLOUD_2, P_CLOUD_3, P_CLOUD_4],

  ctor: function(index) {

    this.initWithFile(this.cloudSrc[index]);
    this.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.setIsVisible(false);

    this.randomMove();

  },

  setRandomPosition: function() {

    this.setPosition(cc.ccp(
      Utils.Random.range(0, 480),
      Utils.Random.range(0, 720)
    ));
  
  },

  randomMove: function() {

    var rand = Math.random();

    this.setIsVisible(true);
    this.setRandomPosition();

    this.runAction(cc.Sequence.create(
      cc.FadeIn.create(1 + Utils.Random.range(0, 1)),
      cc.MoveBy.create(0.5 + Utils.Random.range(0, 1), cc.ccp(Utils.Random.range(-80, 80), 0)),
      cc.FadeOut.create(1 + Utils.Random.range(0, 1)),
      cc.CallFunc.create(this, function() {
        this.setIsVisible(false);
        this.randomMove();
      })
    ));
  
  },

});

var Sky = cc.Layer.extend({

  cloud: [],
  
  duration: 0,

  ctor: function() {

    for (var i = 0; i < 5; ++i) {

      var index = Math.floor(Math.random() * 4);
      var cloudSprite = new Cloud(index);
      this.cloud.push(cloudSprite);
      this.addChild(cloudSprite, 100);

    }

  },

  evolve: function() {
  }

});

Sky.create = function() {

  var sg = new Sky();
  if (sg) {
    return sg;
  }
  return null;

};
