var IsValid = {

  /**
   * return isValid function in tile to turn
   * directions: the character turn direction
   */
  ToTurn: function(directions) {

    var turnDirections = directions;

    return function(tile, character) {

      var pos = tile.getPosition().y;
      var distance = pos + TRACK.WIDTH / 2 - character.getPosition().y;

      if (!turnDirections.isContain(tile.turnDirection) && distance < 0)
        return false;

      return true;

    };

  },

  /**
   * return isValid function in tile to go straight
   * ranges: {route, range, bound}
   * route: valid routes
   * range: valid ranges
   * bound: the sizes' bound
   */
  ToGoStraight: function(ranges) {

    //return character is in route or not
    var isInRoute = function(routes) {		
      return function(route) {
        return routes.isContain(route);
      }
    };

    var isInJumpRoute = function(jumpRoutes) {
      return function(route) {
        return jumpRoutes.isContain(route);
      }
    }

    //return character is in range or not
    var isInRange = function(range) {
      return function(pos) {
        return range.isContain(pos);
      }
    };

    var tests = [];
    for (var i = 0; i < ranges.length; ++i) {

      var routes     = ranges[i].routes;
      var range      = ranges[i].range;
      var jumpRoutes = ranges[i].jumpRoutes;

      tests.push((function() {
        return {
          isInRoute : isInRoute(routes),
          isInJumpRoute : isInJumpRoute(jumpRoutes),
          isInRange : isInRange(range),
        }
      })(routes, jumpRoutes, range));

    }

    //rentur isvalid function
    return function(tile, character) {

      var tile_pos = tile.getPosition().y;
      var character_pos = character.getPosition().y;
      var pos = character_pos - tile_pos + TILE.SIZE / 2;

      var route = character.getCurrentRoute();

      for (var i = 0; i < tests.length; ++i) {

        if (tests[i].isInRange(pos)) {

          if (character.isRunning() || character.isAboutToJump()) 
            return tests[i].isInRoute(route);

          if (character.isJumping())
            return tests[i].isInJumpRoute(route);
    
        }

      }

      return false;

    };
  }

}
