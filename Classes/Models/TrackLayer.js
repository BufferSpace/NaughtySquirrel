
/**
 * TileInformation
 * Change TrackLayer to cc.Layer
 * Add tile, trophies and property to TrackLayer
 * Unify their operations
 */
var TrackLayer = {

  trackElements: [],

  register: function(elem) {

    this.trackElements.push(elem);

  },

  goStraight: function() {

    for (var i = 0; i < this.trackElements.length; ++i)
       this.trackElements[i].goStraight();

  },

  turnLeft: function() {

    for (var i = 0; i < this.trackElements.length; ++i)
      this.trackElements[i].turnLeft();

  },

  turnRight: function() {

    for (var i = 0; i < this.trackElements.length; ++i)
      this.trackElements[i].turnRight();

  },

  remove: function(tag) {

    for (var i = 0; i < this.trackElements.length; ++i) {

      if (this.trackElements[i].getTag() == tag)
        this.trackElements.deleteElementByIndex(i);

    }

  },

  pause: function() { 

    for (var i = 0; i < this.trackElements.length; ++i) {

      this.trackElements[i].pause();

    }

  },

  resume: function() {

    for (var i = 0; i < this.trackElements.length; ++i) {

      this.trackElements[i].resume();

    }

  },

};
