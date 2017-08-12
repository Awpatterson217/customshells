const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events');
const util          = require('util');
const path          = require('path');

const EEmitter = new events.EventEmitter();

    // SEE NOTES AT NodeShell.js
    
/************              NS FACTORY               **********/
/*******
 * 
 *  Optionally pass in default command
 *  Defaults are changeable 
 ******/
let createNodeShell = function(command = '', parameters = [], config) {
    let customNodeShell;
    const defaults = {
        stdio:    'ignore',
        shell:    true,
        detached: true
    }
    const nodeShell = {
        open: function() {
            return child_process.spawn('start', ['node'],this.options).unref();      
        },
        execute: function(file) {
            // IS THERE A POINT TO THIS?
            return child_process.spawn(path.normalize(file), [],this.options); 
        },
        toFile: function(command, parameters, path) {
            let out            = fs.openSync(path, 'a');
            let err            = fs.openSync(path, 'a');
            this.options.stdio = ['ignore', out, err];
            this.params        = parameters || [];
            this.cmd           = command;
            // IS THERE A POINT TO THIS?
            return child_process.spawn(this.cmd, this.params, this.options);
        }
    };
    // Optionally pass in a default command
    nodeShell.command    = command;
    nodeShell.parameters = parameters;
    // Creates options object if none given
    if(arguments.length < 3){
        nodeShell.options   = defaults;
        customNodeShell = Object.create(nodeShell);
        // RETURNS customNodeShell with default options
        return customNodeShell;
    }
    // Ensures default properties are set if alternates not given
    let props = Object.keys(config);
    if(!props.includes('stdio'))    
        config.stdio = defaults.stdio;
    if(!props.includes('shell'))    
        config.shell = defaults.shell;
    if(!props.includes('detached')) 
        config.stdio = defaults.detached;
    nodeShell.options = config;
    // RETURNS customNodeShell with custom options
    customNodeShell = Object.create(commandPrompt);
    return customNodeShell;
}

module.exports = createNodeShell;
