/*
 *	GenerateTrophies
 */

var GenerateTrophies = {

  //return generate trophies function in straight 
  InStraight: function(routes) {

    return function() {

      var positions = [];
      var offset = TILE.SIZE / (MAX_TROPHY_NUM + 1);
      var index = Math.floor(Math.random() * (routes.length + 1));
      var route = 0;

      if (index != routes.length) {

        route = routes[index];
        for (var i = 0; i < MAX_TROPHY_NUM; ++i) {
          positions.push(cc.ccp(route * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, offset * (i + 1)));
        }

      }

      return {
        route : route,
        pos   : positions,
      };

    };  

  },

  //return generate trophies function in turn 

  InTurnable: function(routes) {

    return function() {

      var positions = [];
      var offset = TILE.SIZE / (MAX_TROPHY_NUM + 1);
      var trophyNum = (TILE.SIZE - TRACK.WIDTH) / (2 * offset);
      var index = Math.floor(Math.random() * (routes.length + 1));
      var route = 0;

      if (index != routes.length) {

        var route = routes[index];
        for (var i = 0; i < trophyNum; ++i) {
          positions.push(cc.ccp(route * ROUTE.WIDTH + TRACK.LEFT_COORDINATE, offset * (i + 1)));
        }

      }

      return {
        route : route,
        pos   : positions,
      };

    };

  },

};
