
/**
 * BackgroundController.js is used to controller the moving backgrounds
 * behind the tiles. Although this is not the general version of layer
 * controller, it is made for manipulating many backgrounds which move
 * with different velocities.
 *
 * Background controller selects background according to the current theme.
 * Each theme has a set of default backgrounds. The whole background 
 * mechanism can be described as follows:
 *
 * (1) The background controller gets the current theme.
 * (2) The background controller generates the backgrounds according to the
 *     current theme.
 * (3) The backgrounds move.
 * (4) When the current theme changes, background stops the moving backgrounds.
 */

var BackgroundController = {

  /** 
   * Actually, backgrounds does not mean there are so many backgrounds. Its
   * actual meaning is that the background has so many layers. Each element
   * in the array is a layer of the current background.
   */
  backgrounds: [],
  previousTheme: THEMES.THEME_1,

  /**
   * When the theme changes, first detect whether it has background or not.
   * if it has background, then call the initBackgrounds to initialize the
   * multi-layer background object.
   */
  changeBackgrounds: function(theme, track) {

    if (this.previousTheme.NAME != theme.NAME) {

      if (theme.hasOwnProperty('BACKGROUND_POOL'))
        this.addBackgrounds(theme.BACKGROUND_POOL, track);
      else
        this.removeBackgrounds(track);

      this.previousTheme = theme;

    }
  
  },

  addBackgrounds: function(backgroundPool, track) {

    for (var i = 0; i < backgroundPool.length; ++i) {
      var bg = new Background(backgroundPool[i]);
      this.backgrounds.push(bg);

      track.addChild(bg, Z_ORDER.BACKGROUND);
    }

  },

  removeBackgrounds: function(track) {

    for (var i = 0; i < this.backgrounds.length; ++i)
      track.removeChild(this.backgrounds[i]);

    this.backgrounds = [];
  
  },

  reset: function() {

    this.backgrounds = [];
  
  },

};
