/*
  * return IsBounded function
  * ranges: {route, range, bound}
  * route: valid routes
  * range: valid ranges
  * bound: the sizes' bound
*/
var IsBounded = function(ranges) {

  //return is can move or not
  var movePermission = function(routes, jumpRoutes, bound) {		
    return function(route) {

      var isValidToMoveLeft  = true;
      var isValidToMoveRight = true;
      var isValidToJumpLeft  = true;
      var isValidToJumpRight = true;

      if (!routes.isContain(route - 1) && 
          bound.left == BOUND.SOLID)
        isValidToMoveLeft = false;
      if (!routes.isContain(route + 1) && 
          bound.right == BOUND.SOLID)
        isValidToMoveRight = false;

      if (!jumpRoutes.isContain(route - 1) &&
          bound.left == BOUND.SOLID)
        isValidToJumpLeft = false;
      if (!jumpRoutes.isContain(route + 1) &&
          bound.right == BOUND.SOLID)
        isValidToJumpRight = false;


      return {

        ACTION_MOVE_LEFT  : isValidToMoveLeft,
        ACTION_MOVE_RIGHT : isValidToMoveRight,
        ACTION_JUMP_LEFT  : isValidToJumpLeft,
        ACTION_JUMP_RIGHT : isValidToJumpRight,

      };
    };
  };

  //return is in range or not
  var isInRange = function(range) {
    return function(pos) {
      return range.isContain(pos);
    }
  };

  var tests = [];
  for (var i = 0; i < ranges.length; ++i) {

    var routes     = ranges[i].routes;
    var range      = ranges[i].range;
    var bound      = ranges[i].bound;
    var jumproutes = ranges[i].jumpRoutes;

    tests.push((function() {
      return {
        movePermission : movePermission(routes, jumproutes, bound),
        isInRange      : isInRange(range),
      }
    })(routes, jumproutes, range, bound));

  }

  //rentur isBounded function
  return function(tile, character) {

    var tile_pos = tile.getPosition().y;
    var character_pos = character.getPosition().y;
    var pos = character_pos - tile_pos + TILE.SIZE / 2;

    var route = character.getCurrentRoute();

    for (var i = 0; i < tests.length; ++i) {

      if (tests[i].isInRange(pos)) {
        return tests[i].movePermission(route);
      } 

    }

    return {
      ACTION_MOVE_LEFT  : false,
      ACTION_MOVE_RIGHT : false,
      ACTION_JUMP_LEFT  : false,
      ACTION_JUMP_RIGHT : false,
    };

  };

};
