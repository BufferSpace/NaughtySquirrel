
/**
 * Level Controller has two main responsibilities:
 * 
 *  (1) Enhances the velocity with the time passes.
 *  (2) Generates the tiles sequence with different levels 
 *      according to current tile index.
 *
 *
 * Generating the tile sequence.
 *
 * The goal of generating the tile sequence is to generate a sequence
 * of tile index according to the tile occurence rates. Some of the
 * terms are explained as follow:
 *
 *   # TILE_OCCURENCE_RATES 
 *
 *     It shows how frequently the tiles appear.
 *     For example, [40, 30, 20, 10] means that tile1 has the 40%
 *     chances to appear while tile2 has the opportunity of 30% and
 *     so on.
 *
 *   # TILE_POOL
 *
 *     Tile pool organizes all of the tiles in a level-cluster way.
 *     For example, the tils with the same level are put in the same
 *     bucket. Hence, the pool is in the following way:
 *
 *       [
 *         [ 1 ],
 *         [ 4 ],
 *         [ 2, 3 ],
 *         [ 5, 6 ],
 *       ]
 *
 *   # Rates Variation
 *
 *     Since with the game goes on, the difficulty of the game enhances.
 *     One of the reflections of the difficulty is that the occurence
 *     frequency of the harder tile increases, which means that the tiles'
 *     occurences rates may vary. So the following algorithm defines how
 *     the rates vary.
 *
 *       iter1: [ 40, 30, 20, 10 ]
 *       iter2: [ 39, 29, 19, 13 ]
 *       iter3: [ 38, 28, 18, 16 ], [ 37, 27, 20, 16 ]
 *       iter4: [ 36, 26, 19, 19 ], [ 35, 25, 21, 19 ], [ 34, 26, 21, 19 ]
 *
 * The procedure is describe as follows:
 *
 *   (1) Get iteration time according to the currentTileIndex.
 *   (2) Update tile occurence rate.
 *   (3) Generate tile according to the occurence rates.
 *
 */
var LevelController = {

  velocity  : TILE.VELOCITY,
  trophyVelocity: TROPHY.ABSORB_VELOCITY,
  characterSpeed: CHARACTER.SPEED,

  levels    : 4, 
  iteration : 0,
  theme     : THEMES.THEME_1,
  rates     : THEMES.THEME_1.TILE_OCCURENCE_RATES.copy(), 

  updateVelocity: function() {

    this.velocity += 1;
    this.trophyVelocity += 0.05;
    this.characterSpeed += 0.005;

  },

  reset: function() {

    this.velocity = TILE.VELOCITY;
    this.trophyVelocity = TROPHY.ABSORB_VELOCITY;
    this.characterSpeed = CHARACTER.SPEED;

    this.levels = 4;
    this.iteration = 0;
    this.theme = THEMES.THEME_1;
    this.rates = this.theme.TILE_OCCURENCE_RATES.copy();

  },

  // If the level upgrades, then update the rates. Otherwise, nothing
  // is needed to be done.
  updateLevel: function(currentTileIndex) {

    var currentIteration;

    currentIteration = this.levelFunction(currentTileIndex);

    // Never repeat updating the rates. Update the rates only when
    // the iteration time changes.
    if (this.iteration == currentIteration)
      return;
    else {
      this.updateRates();
      this.iteration = currentIteration;
    }

  },

  levelFunction: function(x) {

    return this.theme.LEVEL_FUNCTION.locateIndex(x);

  },

  updateRates: function() {

    var last;

    for (var i = 0; i < this.iteration; ++i) {

      last = (this.rates.length - 1) - i;
      for (var j = 0; j < last; ++j)
        this.rates[j]--;
      this.rates[last] += last;

    }

  },

  generateTileIndex: function(ranges) {

    var rand = Math.floor(Math.random() * this.theme.TILE_OCCURENCE_RATES_SUM);
    var bucketIndex = ranges.locateIndex(rand);

    var tileIndex = Math.floor(Math.random() * this.theme.TILE_POOL[bucketIndex].length);
    var nextTile = this.theme.TILE_POOL[bucketIndex][tileIndex];

    var validateResult = THEMES.validate(this.theme, nextTile);
    if (validateResult.isChanged) {
      this.theme = validateResult.nextTheme;
      this.rates = this.theme.TILE_OCCURENCE_RATES.copy();
    }

    return nextTile;

  },

  generateTiles: function(n, currentTileIndex, oldTiles) {


    if (currentTileIndex > 1 && currentTileIndex % TILE.LOAD_DURATION != 0)
      return;

    var tiles = [];
    var index, ranges;

    this.updateLevel(currentTileIndex);

    for (var i = 0; i < n; ++i) {

      ranges = new Utils.Ranges(this.rates);
      index = this.generateTileIndex(ranges);
      tiles.push(index);

    }
    
    oldTiles.pushArray(tiles);

  },

};
