
var PropertiesController = {

  //currentProperty: null,
  activeProperties: [],

  add: function(property) {

    this.activeProperties.push(property);

  },

  generate: function(trophies) {

    var randomNum = Math.ceil(Math.random() * PROPERTY.GENERATE_DURATION);

    if (randomNum != PROPERTY.GENERATE_DURATION)
      return null;

    var occupiedRoute = trophies.getCurrentRoute();
    var type = this.generateType();
    var property = Property.create(this.availableRoute(occupiedRoute), type);
    
    return property;

  },

  availableRoute: function(occupiedRoute) {

    var routes = [ROUTE.LEFT, ROUTE.MIDDLE, ROUTE.RIGHT];
    return routes.exclude(occupiedRoute).randomPick();

  },

  generateType: function() {

    var propertyType = null;

    var rates = PROPERTY.POOL.PROPERTY_OCCURENCE_RATES.copy();
    var ranges = new Utils.Ranges(rates);

    var random = Math.floor(Math.random() * PROPERTY.POOL.PROPERTY_OCCURENCE_RATES_SUM);
    var bucketIndex = ranges.locateIndex(random);

    propertyType = PROPERTY.POOL.PROPERTIES_TYPE[bucketIndex];

    return propertyType;

  },


  updateActiveProperties: function(trophy, character) {

    for (var i = 0; i < this.activeProperties.length; ++i) {

      var propertyType = this.activeProperties[i].propertyInformation.type;
      switch(propertyType) {

      case TYPE.TROPHY:
        trophy = this.activeProperties[i].propertyInformation.uglify(trophy);
        this.activeProperties[i].decorate(trophy);
        break;
      case TYPE.CHARACTER:
        this.activeProperties[i].decorate(character);
        break;

      }
     
    }

  },

  updatePropertiesLife: function(trophy, character) {

    for (var i = 0; i < this.activeProperties.length; ++i) {

      this.activeProperties[i].updateLife();
      if (this.activeProperties[i].propertyInformation.life <= 0) {

        var propertyType = this.activeProperties[i].propertyInformation.type;
        switch(propertyType) {

          case TYPE.TROPHY:
            trophy = this.activeProperties[i].propertyInformation.uglify(trophy);
            break;
          case TYPE.CHARACTER:
            character = this.activeProperties[i].propertyInformation.uglify(character);
            break;

        }

        this.activeProperties[i].propertyInformation.reset();
        this.activeProperties.deleteElementByIndex(i--);
        
      }

    }

  },

  reset: function() {

    this.activeProperties = [];
    Double.reset();
    Hp.reset();
    Magnet.reset();

  }

};