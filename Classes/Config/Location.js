var LOCATION = {

  GAME_LAYER: {

    TROPHIES: {
      X: WIN_SIZE.width * 13 / 28,
      Y: WIN_SIZE.height * 670 / 720,
    },

    DISTANCE: {
      X: WIN_SIZE.width * 13 / 28 - 6,
      Y: WIN_SIZE.height * 625 / 720,
    },

  },

  GAMEOVER_LAYER: {

    TROPHIES: {
      X: WIN_SIZE.width / 2 * 122 / 240,
      Y: WIN_SIZE.height / 2 - 20,
    },

    DISTANCE: {
      X: WIN_SIZE.width / 2 * 113 / 240,
      Y: WIN_SIZE.height / 2 - 60,
    },

    SCORE: {
      X: WIN_SIZE.width / 2 * 183 / 240,
      Y: WIN_SIZE.height / 2 - 100,
    },

  },

  PAUSE: {

    BUTTON: {
      X: WIN_SIZE.width * 9 / 10,
      Y: 30,
    },

    LAYER: {
      X: WIN_SIZE.width / 2,   
      Y: WIN_SIZE.height / 2,
    },

  },

  TILE: {

    FIRST: {
      X: WIN_SIZE.width / 2,
      Y: WIN_SIZE.height,
    },

    NOTFIRST: {
      X: WIN_SIZE.width / 2,
      Y: WIN_SIZE.height + TILE.SIZE / 2,
    },

  },

  TROPHIES: {

    INIT: {
      X: -WIN_SIZE.width / 2,
      Y: 0,
    },

    MOVETO: {
      X: 0,
      Y: -TILE.SIZE,
    },
   
  },

};

