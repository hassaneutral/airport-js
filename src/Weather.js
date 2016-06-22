"use strict";

function Weather() {
  this._CHANCE_OF_STORMY = 0.5;
}

Weather.prototype.random = function() {
  return this._random;
}

Weather.prototype.isStormy = function() {
  return (Math.random() > this._CHANCE_OF_STORMY);
};
