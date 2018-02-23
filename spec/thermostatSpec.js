'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });


  describe('Minimum and maximum temperature settings', function() {
    it('starts at 20 degrees by default', function() {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    it('has minimum temperature of 10 degrees', function() {
      thermostat.currentTemperature = thermostat.MINIMUM_TEMPERATURE;
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });

    it('has a maximum temperature of 25 with PSM ON', function() {
      thermostat.switchPowerSavingModeOn();
      thermostat.currentTemperature = thermostat.PSM_ON_MAXIMUM_TEMPERATURE;
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });

    it('has a maximum temperature of 32 with PSM OFF', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.currentTemperature = thermostat.PSM_OFF_MAXIMUM_TEMPERATURE;
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });


    describe('Power saving mode', function() {
      it('is in power saving mode by default', function() {
        expect(thermostat.isPowerSavingModeOn()).toBe(true)
      });

      it('can switch PSM off', function() {
        thermostat.switchPowerSavingModeOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
      });

      it('can switch PSM on', function() {
        thermostat.switchPowerSavingModeOff();
        thermostat.switchPowerSavingModeOn();
        expect(thermostat.isPowerSavingModeOn()).toBe(true);
      });
    });


    describe('Change temperature functions', function() {
      it('will increase temperature by 1', function() {
        thermostat.up();
        thermostat.up();
        expect(thermostat.getCurrentTemperature()).toEqual(22);
      });

      it('will decrease temperature by 1', function() {
        thermostat.down();
        thermostat.up();
        thermostat.down();
        expect(thermostat.getCurrentTemperature()).toEqual(19);
      });

      it('resets the temperature to DEFAULT', function() {
        thermostat.up();
        console.log(thermostat);
        thermostat.reset();
        expect(thermostat.getCurrentTemperature()).toEqual(20);
      });
    });


  describe('Energy usage levels', function() {
    describe('When temperature is below 18 degrees', function () {
      it('is low energy', function() {
        thermostat.currentTemperature = 17;
        expect(thermostat.energyUsage()).toBe('Low');
      });
    });

    describe('When temperature is between 18 and 25 degrees', function () {
      it('is medium energy', function() {
        thermostat.currentTemperature = thermostat.DEFAULT_TEMPERATURE;
        expect(thermostat.energyUsage()).toBe('Medium');
      });
    });

    describe('When temperature is above 25 degrees', function () {
      it('is high energy', function () {
        thermostat.currentTemperature = 27;
        expect(thermostat.energyUsage()).toBe('High');
      });
    });
  });
});
