/*
 * function return PropertyInformation accroding to type 
 */
 
var PropertiesInformation = function(type) {
  
  var propertyInformation = null;
  var isUsed = false;

  switch(type) {
    case PROPERTY.TYPE.DOUBLE:
      propertyInformation = Double;
	    break;
    case PROPERTY.TYPE.TRIPLE:
      propertyInformation = Triple;
      break;
	  case PROPERTY.TYPE.MAGNET:
	    propertyInformation = Magnet;
	    break;
    case PROPERTY.TYPE.HP:
      propertyInformation = Hp;
      break;
  }

  return propertyInformation;

}