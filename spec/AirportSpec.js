"use strict";

describe("Airport", function(){

  var airport;
  var plane;
  var plane1;
  var plane2;
  var plane3;
  var weather;

  beforeEach(function(){
    airport = new Airport();
    plane = jasmine.createSpy('plane');
    plane1 = jasmine.createSpy('plane',['land']);
    plane2 = jasmine.createSpy('plane',['land']);
    plane3 = jasmine.createSpy('plane',['land']);
    weather = jasmine.createSpyObj('weather',['isStormy']);
  });

    it('has no planes by default', function(){
      expect(airport.planes()).toEqual([]);
    });

  describe('under normal conditions', function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('can clear planes for landing', function(){
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });

    it('can clear planes for takeoff', function(){
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
    });

    it('can check for stormy conditions', function(){
      expect(airport.isStormy()).toBeFalsy();
    });

    it('does not allow planes to land when capacity is full', function(){
      spyOn(airport,'capacity').and.returnValue(2);
      airport.clearForLanding(plane1);
      airport.clearForLanding(plane2);
      expect(function(){ airport.clearForLanding(plane3); }).toThrowError('Cannot land, airport capacity is full.');
      expect(airport.planes()).toEqual([plane1,plane2]);
    });
  });

  describe('under stormy conditions', function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(true);
    });

    it('does not clear planes for takeoff', function(){
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('Cannot takeoff during storm.');
    });

    it('does not clear planes for landing', function(){
      expect(function(){ airport.clearForLanding(plane); }).toThrowError('Cannot land during storm.');
    });
  });
});
