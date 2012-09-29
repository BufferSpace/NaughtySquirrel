/*
 *  the score layer
*/

var ScoreItem = cc.Layer.extend({

  scoreType: null,    
  value: 0,     

  digits: null, 

  ctor: function(type, value) {

    this.scoreType = cc.Sprite.create(type);
    this.scoreType.setAnchorPoint(cc.ccp(0, 0));
    this.scoreType.setPosition(cc.ccp(0, 0));
    //this.scoreType.setScale(SCALE_RATE);
    this.addChild(this.scoreType, 900);

    this.digits = new Array(MAX_SCORE_DIGITS_NUM);
    this.initNumberSprites();

  },

  initNumberSprites: function() {

    for (var n = 0; n < MAX_SCORE_DIGITS_NUM; ++n) {

      var numberSprites = [];

      for (var i = 0; i < 10; ++i) {

        var sprite = cc.Sprite.create(
          P_NUMBERS, 
          cc.RectMake(NUMBER_SPRITE_WIDTH * i, 0, NUMBER_SPRITE_WIDTH, NUMBER_SPRITE_HEIGHT)
        );

        sprite.setAnchorPoint(cc.ccp(0, 0));
        //sprite.setScale(SCALE_RATE);
        numberSprites.push(sprite);
        this.addChild(sprite, 100000000);

      }

      this.digits[n] = numberSprites;

    }

    this.arrangeNumberSprites();

  },

  setNumerSpritesInvisible: function() {

    this.digits.map(function(digit) {
      digit.map(function(num) {
        num.setIsVisible(false);
      });
    });

  },

  arrangeNumberSprites: function() {

    var typeWidth = this.scoreType.getContentSize().width;
    var numString = this.value + '';
    this.setNumerSpritesInvisible();


    for(var i = 0; i < numString.length; ++i) {

      var numSprite = this.digits[i][numString[i]];
      numSprite.setIsVisible(true);
      numSprite.setPosition(cc.ccp(typeWidth + i * (NUMBER_SPRITE_WIDTH - 7), 5));

    }

  },

  updateValue: function(updateValue) {

    this.value = updateValue(this.value);
    this.arrangeNumberSprites();

  },

  getValue: function() {

    return this.value;

  },

});

ScoreItem.create = function(type, value) {

  var sg = new ScoreItem(type, value);

  if (sg) return sg;
  return null;

};
