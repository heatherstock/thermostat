'use strict';

function Thermostat() {
  this.powerSavingMode = true;
  this.DEFAULT_TEMPERATURE = 20
  this.currentTemperature = this.DEFAULT_TEMPERATURE
  this.MINIMUM_TEMPERATURE = 10;
  this.PSM_ON_MAXIMUM_TEMPERATURE = 25;
  this.PSM_OFF_MAXIMUM_TEMPERATURE = 32;
  this.LOW_ENERGY_USAGE = 18
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this.currentTemperature;
};

Thermostat.prototype.up = function() {
  if (this.isMaximumTemperature()) {
    return;
  };
    return this.currentTemperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemperature()) {
    return;
  };
  return this.currentTemperature -= 1;
};

Thermostat.prototype.isMaximumTemperature = function () {
  if (this.powerSavingMode === false) {
    return this.currentTemperature === this.PSM_OFF_MAXIMUM_TEMPERATURE;
  }
    return this.currentTemperature === this.PSM_ON_MAXIMUM_TEMPERATURE;
};

Thermostat.prototype.isMinimumTemperature = function () {
  return this.currentTemperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode === true;
};

Thermostat.prototype.switchPowerSavingModeOff = function () {
  this.powerSavingMode = false;
};

Thermostat.prototype.switchPowerSavingModeOn = function () {
  this.powerSavingMode = true;
  this.currentTemperature = this.PSM_ON_MAXIMUM_TEMPERATURE;
};

Thermostat.prototype.reset = function () {
  this.currentTemperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.energyUsage = function () {
  if(this.currentTemperature < this.LOW_ENERGY_USAGE) {
    return 'Low';
  }
  else if(this.currentTemperature <= this.PSM_ON_MAXIMUM_TEMPERATURE) {
    return 'Medium';
  }
  else {
    return 'High';
  };
};
