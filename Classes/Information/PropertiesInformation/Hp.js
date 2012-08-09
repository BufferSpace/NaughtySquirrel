
var Hp = {
  
  name: PROPERTY.TYPE.HP,
  src: P_HP,
  bgSrc: P_HP_UP,
  type: TYPE.CHARACTER,
  life: 1,

  energy: 1,


  decorate: function(character) {

    if (this.life > 0 && character.hp < CHARACTER.MAX_HP) {

        character.hp += this.energy;
        character.setSrc(character.hp);
        this.life--;
    
    }

    return character;

  },

  uglify: function(character) {

    return character;

  },

  reset: function() {

    this.life = 1;

  },

};