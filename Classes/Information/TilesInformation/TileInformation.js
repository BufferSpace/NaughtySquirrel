/*
 *	function return tileinformation accroding to type
 */

var TileInformation = function(type) {
  
  var tileInformation = null;

  switch(type) {

    case 1:
      tileInformation = Tile1;
      break;
    case 2:
      tileInformation = Tile2;
      break;
    case 3:
      tileInformation = Tile3;
      break;
    case 4:
      tileInformation = Tile4;
      break;
    case 5:
      tileInformation = Tile5;
      break;
    case 6:
      tileInformation = Tile6;
      break;
    case 7:
      tileInformation = Tile7;
      break;
    case 8:
      tileInformation = Tile8;
      break;
    case 9:
      tileInformation = Tile9;
      break;
    case 10:
      tileInformation = Tile10;
      break;
    case 11:
      tileInformation = Tile11;
      break;
    case 12:
      tileInformation = Tile12;
      break;

  }

  return tileInformation;

}
