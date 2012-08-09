//Magne

var Magnet = {
	
	name: PROPERTY.TYPE.MAGNET,
	src: P_MAGNET,
	bgSrc: P_MAGNET,
	type: TYPE.CHARACTER,
	life: 5,

	xForce: 2,
	yForce: 150,
	
	decorate: function(character) {
		
		var buffer = character.getTrophyBuffer();
		var bufferX = buffer.trophyBufferX;
		var bufferY = buffer.trophyBufferY;

		character.TrophyBufferRect = new Utils.Rect(bufferX + this.xForce, bufferY + this.yForce);

		return character;

	},

	uglify: function(character) {

		character.TrophyBufferRect = new Utils.Rect(TROPHY.GET_BUFFERX, TROPHY.GET_BUFFERY);
		
		return character;

	},

	reset: function() {

		this.life = 5;

	},

};