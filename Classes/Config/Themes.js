var THEMES = {

  validate: function(currentTheme, tileIndex) {

    var isChanged = true;
    var nextTheme = currentTheme;
    
    if (tileIndex == 7)
      nextTheme = this.THEME_3;
    else if (tileIndex == 10)
      nextTheme = this.THEME_1;
    else if (tileIndex == 12)
      nextTheme = this.THEME_1;
    else
      isChanged = false;

    return {
      isChanged: isChanged,
      nextTheme: nextTheme,
    };

  },

  getThemeByTileIndex: function(index) {

    if ((1 <= index && index <= 6) || index == 10)
      return this.THEME_1;
    if ((7 <= index && index <= 9) || index == 11)
      return this.THEME_2;
    if (index <= 12 && index <= 12)
      return this.THEME_3;

  },

  THEME_1: {

    NAME: 'TRANQUIL FOREST',
    TILE_OCCURENCE_RATES: [100],
    TILE_OCCURENCE_RATES_SUM: 100,
    LEVEL_FUNCTION: new Utils.Ranges([5, 10, 15, 20, 25]),
    TILE_POOL: [
      [1, 7],
      /*
      [4],
      [2, 3],
      [5, 6],
      */
    ],

  },

  THEME_2: {

    NAME: 'MISTERIOUS BUSH',
    TILE_OCCURENCE_RATES: [20, 40, 40],
    TILE_OCCURENCE_RATES_SUM: 100,
    LEVEL_FUNCTION: new Utils.Ranges([5, 10, 15, 20, 25]),
    TILE_POOL: [
      [10],
      [8, 9],
      [11],
    ],

  },

  THEME_3: {

    NAME: 'TEST THEME',
    TILE_OCCURENCE_RATES: [100],
    TILE_OCCURENCE_RATES_SUM: 100,
    LEVEL_FUNCTION: new Utils.Ranges([5, 10, 15, 20, 25]),
    TILE_POOL: [
      [12],
    ],
    BACKGROUND_POOL: [
      [2],
      [1], 
    ]

  },

}
