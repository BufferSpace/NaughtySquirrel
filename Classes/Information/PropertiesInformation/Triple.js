//Double

var Triple = {
  
  name: PROPERTY.TYPE.TRIPLE,
  src: P_TRIPLE,
  bgSrc: P_TRIPLE_BG,
  type: TYPE.TROPHY,
  life: 5,
  
  decorate: function(trophy) {

    trophy.value *= 3;
    trophy.src = P_TRIPLE_COIN;
    return trophy;

  },

  uglify: function(trophy) {

    trophy.value = 1;
    trophy.src = P_COIN;
    
    return trophy;

  },

  reset: function() {

    this.life = 5;

  },
  
};