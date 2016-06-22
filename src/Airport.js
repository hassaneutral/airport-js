"use strict";

function Airport(DEFAULT_CAPACITY=5,weather) {
  this._hangar = [];
  this._capacity = DEFAULT_CAPACITY;
  this._weather = typeof weather !== 'undefined' ? weather : new Weather();
}

Airport.prototype.planes = function(){
  return this._hangar;
};

Airport.prototype.capacity = function(){
  return this._capacity;
};

Airport.prototype.clearForLanding = function(plane){
  if(this._weather.isStormy()) {
    throw new Error('Cannot land during storm.');
  }
  else if(this.planes().length === this.capacity()){
    throw new Error('Cannot land, airport capacity is full.')
  }
  this._hangar.push(plane);
};

Airport.prototype.clearForTakeOff = function(plane){
  if(this._weather.isStormy()) {
    throw new Error('Cannot takeoff during storm.');
  }
  this._hangar = [];
};

Airport.prototype.isStormy = function(){
  return false;
};
