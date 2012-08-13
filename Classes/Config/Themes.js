var THEMES = {

  validate: function(currentTheme, tileIndex) {

    var isChanged = true;
    var nextTheme = currentTheme;
    
    if (tileIndex == 7)
      nextTheme = this.THEME_2;
    else if (tileIndex == 10)
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
      return this.THEME_1.NAME;
    if ((7 <= index && index <= 9) || index == 11)
      return this.THEME_2.NAME;

  },

  hasBackgrounds: function(theme) {

    if (theme.NAME == 'TEST THEME')
      return true;
    return false;
  
  },

  THEME_1: {

    NAME: 'TRANQUIL FOREST',
    TILE_OCCURENCE_RATES: [100],
    TILE_OCCURENCE_RATES_SUM: 100,
    LEVEL_FUNCTION: new Utils.Ranges([5, 10, 15, 20, 25]),

    /*
    TILE_POOL: [
      [1, 7],
      [4],
      [2, 3],
      [5, 6],
    ],
    */

    TILE_POOL: [
      [1],
    ],
    BACKGROUND_POOL: [
      [1],
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

}
