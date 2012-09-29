
var Footprints = cc.Layer.extend({

  FOOT_PRINTS_TAG_OFFSET: 100000,
  FOOT_PRINTS_DURATION: 0,
  footprints: [P_FOOTPRINT_1, P_FOOTPRINT_2, P_FOOTPRINT_3, P_FOOTPRINT_4, P_FOOTPRINT_5],
  innerPrint: null,
  innerPatternLight: null,
  outerPrint: null,
  currentTheme: THEMES.THEME_1,

  ctor: function() {

    this.setAnchorPoint(cc.ccp(0, 0));
    this.setPosition(cc.ccp(0, 0));

    this.createLandedPrint(this.initLandedSrc());
    
  },

  createLandedPrint: function(src) {

    this.innerPrint = cc.Sprite.create(src.INNER_PRINT);
    this.innerPrint.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.innerPrint.setIsVisible(false);
    this.addChild(this.innerPrint, 100);
    
    this.innerPatternLight = cc.Sprite.create(src.INNER_PATTERN_LIGHT);
    this.innerPatternLight.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.innerPatternLight.setIsVisible(false);
    this.addChild(this.innerPatternLight, 100);
  
    this.outerPrint = cc.Sprite.create(src.OUTER_PATTERN);
    this.outerPrint.setAnchorPoint(cc.ccp(0.5, 0.5));
    this.outerPrint.setIsVisible(false);
    this.addChild(this.outerPrint, 100);
    
  },

  initLandedSrc: function() {

    var src = {

      INNER_PRINT: P_INNER_RED,
      INNER_PATTERN_LIGHT: P_INNER_YELLOW,
      OUTER_PATTERN: P_OUTER_PURPLE,

    };

    if (this.currentTheme.NAME == 'TRANQUIL FOREST') {

      src.INNER_PRINT = P_INNER_RED;
      src.INNER_PATTERN_LIGHT = P_INNER_YELLOW;
      src.OUTER_PATTERN = P_OUTER_PURPLE;

    }

    if (this.currentTheme.NAME == 'MISTERIOUS BUSH') {

      src.INNER_PRINT = P_INNER_WHITE;
      src.INNER_PATTERN_LIGHT = P_INNER_YELLOW;
      src.OUTER_PATTERN = P_OUTER_WHITE;

    }

    return src;

  },

  createSprites: function() {

    var self = this;

    setTimeout(function() {

      self.removeChild(self.innerPrint);
      self.removeChild(self.innerPatternLight);
      self.removeChild(self.outerPrint);

      self.innerPrint = null;
      self.innerPatternLight = null;
      self.outerPrint = null;

      self.createLandedPrint(self.initLandedSrc());

    }, 600);

  },

  evolve: function(character, flag) {

    if (character.isRunning())
      this.running(character);

    this.currentTheme = flag.theme;
    if (typeof flag.isLanded !== 'undefined' && flag.isLanded)
      this.landed(character);

    if (typeof flag.isAboutToJump !== 'undefined' && flag.isAboutToJump)
      this.aboutToJump(character);
  	
  },

  createFootprint: function(index, x, y, scale) {

    var newFootprint = cc.Sprite.create(this.footprints[index]);

    newFootprint.setScale(0.5);
    newFootprint.setAnchorPoint(cc.ccp(0.5, 0.5));
    newFootprint.setPosition(cc.ccp(x, y));
    this.addChild(newFootprint, 100);

    newFootprint.runAction(cc.ScaleTo.create(0.4, scale));
    newFootprint.runAction(cc.FadeOut.create(1));
    newFootprint.runAction(cc.MoveTo.create(
      (WIN_SIZE.height / 4 + 100) / LevelController.velocity, 
      cc.ccp(x, -100))
    );
   
    var self = this;

    setTimeout((function(sprite) {
      return function() {
        self.removeChild(sprite);
      }
    })(newFootprint), 1000);

  },

  running: function(character) {

    this.FOOT_PRINTS_DURATION++;

    if (this.FOOT_PRINTS_DURATION % 6 == 0)
      var x = character.getPosition().x - 20;
    else if (this.FOOT_PRINTS_DURATION % 11 == 0)
      var x = character.getPosition().x + 20;
    else
      return;

    var index = Math.floor(Math.random() * 5);
    this.createFootprint(index, x, WIN_SIZE.height / 4 - 50, 1.5);

  },

  aboutToJump: function(character) {

    var x = character.getPosition().x;
    var y = character.getPosition().y;
    
    this.showJumpPrint(x, y - 30);

  },

  showJumpPrint: function(x, y) {

    this.innerPrint.setScale(0.6);
    this.innerPrint.setIsVisible(true);
    this.innerPrint.setPosition(cc.ccp(x, y));

    this.innerPatternLight.setScale(0.6);
    this.innerPatternLight.setIsVisible(true);
    this.innerPatternLight.setPosition(cc.ccp(x, y));

    this.outerPrint.setScale(0.6);
    this.outerPrint.setIsVisible(true);
    this.outerPrint.setPosition(cc.ccp(x, y));

    this.innerPatternLight.runAction(cc.RotateBy.create(0.6, -360));
    this.innerPatternLight.runAction(cc.ScaleTo.create(0.6, 0.1));
    this.innerPatternLight.runAction(cc.FadeOut.create(0.6));

    this.outerPrint.runAction(cc.RotateBy.create(0.6, -360));
    this.outerPrint.runAction(cc.ScaleTo.create(0.6, 0.1));
    this.outerPrint.runAction(cc.FadeOut.create(0.6));

    this.innerPrint.runAction(cc.RotateBy.create(0.6, 360));
    this.innerPrint.runAction(cc.ScaleTo.create(0.6, 0.1));
    this.innerPrint.runAction(cc.FadeOut.create(0.6));
    
    this.createSprites();

  },

  landed: function(character) {

    var x = character.getPosition().x;
    var y = character.getPosition().y;
    
    this.showLandedPrint(x, y - 30);

  },

  showLandedPrint: function(x, y) {

    this.innerPrint.setScale(0.5);
    this.innerPrint.setIsVisible(true);
    this.innerPrint.setPosition(cc.ccp(x, y));

    this.innerPatternLight.setScale(0.5);
    this.innerPatternLight.setIsVisible(true);
    this.innerPatternLight.setPosition(cc.ccp(x, y));

    this.outerPrint.setScale(0.5);
    this.outerPrint.setIsVisible(true);
    this.outerPrint.setPosition(cc.ccp(x, y));

    this.innerPatternLight.runAction(cc.ScaleTo.create(0.2, 1.5));
    this.innerPatternLight.runAction(cc.FadeOut.create(0.2));

    this.outerPrint.runAction(cc.ScaleTo.create(0.2, 1));
    this.outerPrint.runAction(cc.FadeOut.create(0.2));
    
    this.innerPrint.runAction(cc.Sequence.create(
      cc.RotateBy.create(0.3, 360),
      cc.CallFunc.create(this.innerPrint, function() {

        this.runAction(cc.ScaleTo.create(0.2, 1));
        this.runAction(cc.FadeOut.create(0.2));
        this.runAction(cc.MoveTo.create(
          (WIN_SIZE.height / 4 + 100) / LevelController.velocity, 
          cc.ccp(x, -100))
        );

      })
      
    ));

    this.createSprites();

  },

});

Footprints.create = function() {

  var sg = new Footprints();
  if (sg) {
    return sg;
  }
  return null;

};
