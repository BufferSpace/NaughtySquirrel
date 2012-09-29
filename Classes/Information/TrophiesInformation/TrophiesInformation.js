/*
 * function return TrophyInformation accroding to type 
 */
 
var TrophyInformation = function(type) {
  
  var trophyInformation = null;

  switch(type) {
    case TROPHY.TYPE.COIN:
      trophyInformation = Coin;
	    break;
  }

  return trophyInformation;

}