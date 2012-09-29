
//tile 1: straight
var Tile1 = BasicTile({

  src: P_TILE_1,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [1, 2, 3],

});

//tile 2: turn left
var Tile2 = BasicTile({

  src: P_TILE_2,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: true,
  directions: [ ACTION.TURN_LEFT ],
  trophieRoutes: [1, 2, 3],

});

//tile 3: turn right
var Tile3 = BasicTile({

  src: P_TILE_3,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: true,
  directions: [ ACTION.TURN_RIGHT ],
  trophieRoutes: [1, 2, 3],

});

//tile 4: turn left and turn right
var Tile4 = BasicTile({

  src: P_TILE_4,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: true,
  directions: [ ACTION.TURN_LEFT, ACTION.TURN_RIGHT ],
  trophieRoutes: [1, 2, 3],

});

//tile 5: short narrow
var Tile5 = BasicTile({

  src: P_TILE_5,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE / 3),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  },{
    routes : [1],
    jumpRoutes  : [0, 1, 2, 3, 4],
    range  : new Utils.Range(TILE.SIZE / 3, 2 * TILE.SIZE / 3),
    bound  : { left: BOUND.FRAGILE, right: BOUND.FRAGILE },
  },{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(2 * TILE.SIZE / 3, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [1],

});

//tile 6: long narrow
var Tile6 = BasicTile({

  src: P_TILE_6,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE / 3),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  },{
    routes : [3],
    jumpRoutes  : [0, 1, 2, 3, 4],
    range  : new Utils.Range(TILE.SIZE / 3, 2 * TILE.SIZE / 3),
    bound  : { left: BOUND.FRAGILE, right: BOUND.FRAGILE },
  },{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(2 * TILE.SIZE / 3, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [3],

});

//tile 7: straight
var Tile7 = BasicTile({

  src: P_TILE_7,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [1, 2, 3],

});


//tile 8: turn left
var Tile8 = BasicTile({

  src: P_TILE_8,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: true,
  directions: [ ACTION.TURN_LEFT ],
  trophieRoutes: [1, 2, 3],

});

//tile 9: turn right
var Tile9 = BasicTile({

  src: P_TILE_9,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: true,
  directions: [ ACTION.TURN_RIGHT ],
  trophieRoutes: [1, 2, 3],

});

//tile 10: straight
var Tile10 = BasicTile({

  src: P_TILE_10,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [1, 2, 3],

});


//tile 11: short narrow
var Tile11 = BasicTile({

  src: P_TILE_11,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE / 3),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  },{
    routes : [],
    jumpRoutes  : [0, 1, 2, 3, 4],
    range  : new Utils.Range(TILE.SIZE / 3, 2 * TILE.SIZE / 3),
    bound  : { left: BOUND.FRAGILE, right: BOUND.FRAGILE },
  },{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(2 * TILE.SIZE / 3, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [],

});

//tile 2: straight
var Tile12 = BasicTile({

  src: P_TILE_12,
  ranges: [{
    routes : [1, 2, 3],
    jumpRoutes  : [1, 2, 3],
    range  : new Utils.Range(0, TILE.SIZE),
    bound  : { left: BOUND.SOLID, right: BOUND.SOLID },
  }],
  turnable: false,
  directions: [ ACTION.GO_STRAIGHT ],
  trophieRoutes: [1, 2, 3],

});
