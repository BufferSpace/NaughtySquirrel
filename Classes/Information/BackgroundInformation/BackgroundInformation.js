/**
 * BackgroundInformation.js
 */

var BackgroundInformation = function(type) {
  
  var backgroundInformation = null;

  switch(type) {

    case 1:
      backgroundInformation = Background1;
      break;
    case 2:
      backgroundInformation = Background2;
      break;

  }

  return backgroundInformation;

}
