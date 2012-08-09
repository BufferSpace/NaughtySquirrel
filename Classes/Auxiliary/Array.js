//return the element is n array or not
Array.prototype.isContain = function(e) {

  return this.indexOf(e) != -1;

}

Array.prototype.copy = function() {

  var rst = [];
  for (var i = 0; i < this.length; ++i)
    rst.push(this[i]);

  return rst;

}

Array.prototype.exclude = function(e) {

  var rst = [];
  for (var i = 0; i < this.length; ++i) {
    if (e != this[i])
      rst.push(this[i]);
  }

  return rst;

}

Array.prototype.randomPick = function() {

  var index = Math.floor(Math.random() * this.length);
  return this[index];

}

Array.prototype.deleteElementByIndex = function(e) {

  var end = this.length - 1;
  var temp = this[e];
  this[e] = this[end];
  this[end] = temp;
  this.pop();

  return this;

}

Array.prototype.pushArray = function(arr) {

  for (var i = 0; i < arr.length; ++i)
    this.push(arr[i]);

}