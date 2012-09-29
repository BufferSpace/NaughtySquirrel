
var EnvironmentsController = {

  environments: [],

  addTo: function(environment, track) {

    track.addChild(environment, Z_ORDER.ENVIRONMENT);
    this.environments.push(environment);

  },

  evolve: function(character, flag) {

    for (var i = 0; i < this.environments.length; ++i)
      this.environments[i].evolve(character, flag);

  },

  reset: function() {

    this.environments = [];

  }

}
