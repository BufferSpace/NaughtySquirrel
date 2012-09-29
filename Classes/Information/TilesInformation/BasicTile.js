/*
 *  return BasicTile accroding to configs
 */

var BasicTile = function(configs) {

  //return isBounded function
  var isBounded = IsBounded(configs.ranges);

  //return isValid function
  var isValid   = (function(ranges, turnable, directions) {

    if (turnable)
      return IsValid.ToTurn(directions);
    else
      return IsValid.ToGoStraight(ranges);

  })(configs.ranges, configs.turnable, configs.directions);

  //return isTurnable function
  var isTurnable = function() {

    return configs.turnable;

  };

  //return generateTrophies function
  var generateTrophies = (function(turnable, routes) {

    if (turnable)
      return GenerateTrophies.InTurnable(routes);
    else
      return GenerateTrophies.InStraight(routes);

  })(configs.turnable, configs.trophieRoutes);

  return {

    src              : configs.src,
    isBounded        : isBounded,
    isValid          : isValid,
    isTurnable       : isTurnable,
    generateTrophies : generateTrophies

  };

}
