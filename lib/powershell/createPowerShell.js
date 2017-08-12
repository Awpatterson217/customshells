const child_process = require('child_process');
const events        = require('events');
const fs            = require('fs');
const util          = require('util');
const path          = require('path');
const INIT_PS       = require('./files/constants/constants');

const EEmitter = new events.EventEmitter();

/************               PS FACTORY              **********/
/*******
 * 
 *  Optionally pass in default command
 *  Defaults are changeable 
 ******/
let createPowerShell = function(command = '', parameters = [], config) {
    let customPowerShell;
    const defaults = {
        stdio:    'ignore',
        shell:    true,
        detached: true
    }
    const powerShell = {
        open: function() {
            return child_process.spawn(INIT_PS, [],this.options).unref();      
        },
        // IS THERE A POINT TO THIS? 
        execute: function(file) {
           
            return child_process.spawn(INIT_PS + path.normalize(file), [],this.options); 
        },
        // IS THERE A POINT TO THIS?
        toFile: function(command, parameters, path) {
            let out            = fs.openSync(path, 'a');
            let err            = fs.openSync(path, 'a');
            this.options.stdio = ['ignore', out, err];
            this.params        = parameters || [];
            this.cmd           = command;
            return child_process.spawn(INIT_PS + this.cmd, this.params, this.options);
        }
    };
    // Optionally pass in a default command
    powerShell.command    = command;
    powerShell.parameters = parameters;
    // Creates options object if none given
    if(arguments.length < 3){
        powerShell.options   = defaults;
        customPowerShell = Object.create(powerShell);
        // RETURNS customPowerShell with default options
        return customPowerShell;
    }
    // Ensures default properties are set if alternates not given
    let props = Object.keys(config);
    if(!props.includes('stdio'))    
        config.stdio = defaults.stdio;
    if(!props.includes('shell'))    
        config.shell = defaults.shell;
    if(!props.includes('detached')) 
        config.stdio = defaults.detached;
    powerShell.options = config;
    // RETURNS customPowerShell with custom options
    customPowerShell = Object.create(powerShell);
    return customPowerShell;
}

module.exports = createPowerShell;