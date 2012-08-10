var KEYS = [];

var TILE_BACKGROUND = {

  SIZE: 1440,

}

var TRACK = {

  WIDTH : TILE_BACKGROUND.SIZE / 6,
  LEFT_COORDINATE  : WIN_SIZE.width / 2 - TILE_BACKGROUND.SIZE / 9,
  RIGHT_COORDINATE : WIN_SIZE.width / 2 + TILE_BACKGROUND.SIZE / 9,

};

var ROUTE = {

  LEFT   : 1,
  MIDDLE : 2,
  RIGHT  : 3,
  WIDTH  : TRACK.WIDTH / 3,

};


/**
 *  _____________________________
 *     /\                        |
 *                               |<-----------------------
 *  TRACK.WIDTH                  |  TILE.TURN_BUFFER      |
 *                               |        |               |
 *  ___\/______________          |<-------            CHARACTER_TURN_BUFFER
 *                     |         |                        |
 *                     |         |                        |
 *                     |         |                        |
 *                     |         |<-----------------------
 *                     |         |
 *                     |         |
*/
var TILE = {

  SIZE: TILE_BACKGROUND.SIZE,
  VELOCITY: 600,
  LOAD_BUFFER: 60, //TILE_BACKGROUND.SIZE / 15, 
  LOAD_DURATION: 10,
  TURN_BUFFER: new Utils.Range(-TRACK.WIDTH / 2, TRACK.WIDTH / 3),

  ANCHORPOINT: {
    X: 0.5,
    Y: 0.5,
  }

};

var CHARACTER = {

  TAG: 0,
  MOVE_VELOCITY: 300,
  JUMP_DISTANCE: 600,
  SPEED: 60,
  LAND_BUFFER: 30,
  HP_INCREASE_DURATION: 5,
  MAX_HP: 2,
  TURN_BUFFER: new Utils.Range(-TRACK.WIDTH, TRACK.WIDTH / 3),

  SPRITE_WIDTH: 75,
  SPRITE_HEIGHT: 113,

  STATUS: {
    RUNNING: 'RUNNING',
    ABOUT_TO_JUMP: 'ABOUT_TO_JUMP',
    JUMPING: 'JUMPING',
  },

};


var ACTION = {

  BOTH_DIRECTION : 'ACTION_BOTH_DIRECTION',
  GO_STRAIGHT    : 'ACTION_GO_STRAIGHT',
  MOVE_LEFT      : 'ACTION_MOVE_LEFT',
  MOVE_RIGHT     : 'ACTION_MOVE_RIGHT',
  TURN_LEFT      : 'ACTION_TURN_LEFT',
  TURN_RIGHT     : 'ACTION_TURN_RIGHT',

};

var PROPERTY = {

  TAG_OFFSET: 5000,
  GENERATE_DURATION: 2,

  TYPE: {

    DOUBLE: 'PROPERTY_DOUBLE',
    TRIPLE: 'PROPERTY_TRIPLE',
    MAGNET: 'PROPERTY_MAGNET',
    HP    : 'PROPERTY_HP',

  },

  POOL: {

    PROPERTY_OCCURENCE_RATES: [20, 20, 30, 30],
    PROPERTY_OCCURENCE_RATES_SUM: 100,
    PROPERTIES_TYPE: ['PROPERTY_TRIPLE',
                      'PROPERTY_HP',
                      'PROPERTY_DOUBLE',
                      'PROPERTY_MAGNET',
                      ],

  },

  ANCHORPOINT: {
    X: 0.5,
    Y: 0.5,
  }
  
};

var TROPHY = {

  TAG_OFFSET: 10000,

  ABSORB_VELOCITY: 15,
  SCALE: 4,
  SCALE_TIME: 0.2, 
  FADEOUT_TIME: 0.8,

  REMOVE_BUFFERX: 20,
  REMOVE_BUFFERY: 50,

  GET_BUFFERX: 0,
  GET_BUFFERY: 60,

  SPRITE_WIDTH: 50,
  SPRITE_HEIGHT: 50,

  TYPE: {

    COIN: 'TROPHY_COIN',

  },
  
};

var TROPHIES = {

  ANCHORPOINT: {
      X: 0.5, 
      Y: 0.5,
  },

  ROTATE_TIME: 0.1,
  ROTATE_ANGLE: 90,

}

var BOUND = {

  SOLID: 'BOUND_SOLID',
  FRAGILE: 'BOUND_FRAGILE',

};

var TYPE = {

  TRACK: 'TRACK_TYPE',
  CHARACTER: 'CHARACTER_TYPE',
  TROPHY: 'TROPHY_TYPE',

};

var Z_ORDER = {

  TILE: 1,
  TROPHIES: 2,
  PROPERTY: 2,
  ENVIRONMENT: 3,
  CHARACTER: 4,

  TROPHY: 5,
  
  SCORE_LAYER: 100,
  PAUSE_BUTTON: 200,

};

var GAMEOVER = {

  TYPE: {
    CROSS_BORDER: 'CROSS_BORDER',
    NO_HP       : 'NO_HP',
  },

};

var MAX_TROPHY_NUM = 20;
var MAX_SCORE_DIGITS_NUM = 5;
var NUMBER_SPRITE_WIDTH = 24;
var NUMBER_SPRITE_HEIGHT = 40;


/* use for test*/
var PAUSE_BUTTON_BUFFER = 32;

var RESET = function() {

  EnvironmentsController.reset();
  LevelController.reset(); 
  PropertiesController.reset();
  TrophiesController.reset();
  TrophiesActionsController.reset();
  
};  
