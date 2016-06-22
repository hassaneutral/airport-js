"use strict";

describe('Feature Test:', function(){

  var plane;
  var plane1;
  var plane2;
  var plane3;
  var airport;

  beforeEach(function(){
    plane = new Plane();
    plane1 = new Plane();
    plane2 = new Plane();
    plane3 = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions', function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('Planes can be instructed to land at an airport', function(){
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('planes can be instructed to take off', function(){
      plane.land(airport);
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });

    it('blocks landing when airport capacity is full', function(){
      spyOn(airport,'capacity').and.returnValue(2);
      plane1.land(airport);
      plane2.land(airport);
      expect(function(){ plane3.land(airport); }).toThrowError('Cannot land, airport capacity is full.');
      expect(airport.planes()).toEqual([plane1,plane2]);
    });
  });

  describe('under stormy conditions', function(){
    it('blocks takeoff when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport);
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff(); }).toThrowError("Cannot takeoff during storm.");
      expect(airport.planes()).toContain(plane);
    });

    it('blocks landing when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ plane.land(airport); }).toThrowError("Cannot land during storm.");
      expect(airport.planes()).toEqual([]);
    });
  });

});
