
var Utils = Utils || {}

/**
 * Util.Range defines a convenient data structure for describe
 * an interval which is consisted of two bounds, say the begin
 * and the end. It has the following form:
 *
 *   [ begin, end ]
 *
 */
Utils.Range = function(begin, end) {

  this.begin = begin;
  this.end   = end;

}

Utils.Range.prototype = {

  // Determines whether the given position is in the range or not.
  isContain: function(pos) {

    return pos >= this.begin && pos <= this.end;

  },

  // Scale the range.
  scale: function(s) {

    this.begin *= s;
    this.end *= s;

    return this;

  },

  // Decide whether the distance is larger than the magnitude of the
  // range or not.
  gt: function(distance) {

    return distance < this.magnitude();

  },

  // Decide whether the distance is shorter than the magnitude of the
  // range or not.
  lt: function(distance) {

    return distance > this.magnitude();

  },

  // Calculate the magnitude of the range.
  magnitude: function() {

    return this.end - this.begin;

  },

}

/**
 * Utils.Ranges defines a set of ranges. Though we can simple use an
 * array to store the ranges, we still find it convenient to wrap it
 * in this way. It has the following structure:
 *
 *  [ 
 *    Range1(begin, end), 
 *    Range2(begin, end), 
 *           :
 *           :
 *           :
 *    RangeN(begin, end)
 *  ]
 */
Utils.Ranges = function(ranges) {

  this.ranges = this.init(ranges);

}

Utils.Ranges.prototype = {

  /**
   * Here the cumulative array is used. For example: 
   *
   *   [ 40, 30, 20, 10 ]
   *
   * becomes:
   *
   *   [ 0, 40, 70, 90, 100 ]
   */
  init: function(ranges) {

    var acc = ranges[0];
    var rs = [new Utils.Range(0, acc)];

    for (var i = 0; i < ranges.length - 1; ++i) {

      rs.push(new Utils.Range(acc, acc + ranges[i + 1]));
      acc += ranges[i + 1];

    }

    return rs;
  
  },

  // Returns the index of the range which contains the given position.
  // Otherwise, returns -1 instead.
  locateIndex: function(pos) {

    for (var i = 0; i < this.ranges.length; ++i) {
      if (this.ranges[i].isContain(pos))
        return i;
    }

    return -1;
  
  },

}

Utils.Random = {

  range: function(begin, end) {

    return begin + Math.random() * (end - begin);

  }

}

Utils.copy = function(obj) {

  var newObj = {}

  for (attr in obj) {
    newObj[attr] = obj[attr];
  }

  return newObj;

}

Utils.sum = function(arr) {

  var s = 0;
  for (var i = 0; i < arr.length; ++i)
    s += arr[i];

  return s;

}

Utils.Rect = function(bufferX, bufferY) {

  this.rangeX = new Utils.Range(-bufferX, bufferX);
  this.rangeY = new Utils.Range(-bufferY, bufferY);

}

Utils.Rect.prototype = {

  isContain: function(x, y) {

    return this.rangeX.isContain(x) && this.rangeY.isContain(y);

  },

}