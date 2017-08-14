const child_process = require('child_process');
const fs            = require('fs');
const path          = require('path');

let shell = {
    defaults: {
        stdio:    'pipe',
        detached: false,
        shell:    false
    },
    options:    {},
    ref:        true,
    hasOptions: false,
    isNode:     false,
    isNew:      false,
    willExec:   false,
    hasFile:    false,
    hasTree:    false,
    cd:         false,
};
/**
 *  Can create file at runtime, Flag 'a', 
 *  see: https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback
 * 
 * @param {string} file
 * @param {string} flag
 * 
 */
shell.toFile = function(file, flag = 'a'){
    this.flag    = flag;
    this.file    = path.normalize(file);
    this.hasFile = true;
    return this;
}
/**
 * 
 *
 */
shell.new = function(){
    this.isNew = true;
    this.ref   = false;
    return this;
}
/**
 * 
 * @param {string} nodeModule
 */
shell.node = function(nodeModule){
    this.nodeModule = path.normalize(nodeModule);
    this.isNode     = true;
    return this;
}
/**
 * 
 * @param {string} script
 */
shell.execute = function(script){
    this.script   = path.normalize(script);       // TO DO
    this.willExec = true;
    return this;
}
/**
 * 
 * @param {string} dir
 */
shell.tree = function(dir){
    this.dir     = path.normalize(dir);          // TO DO
    this.hasTree = true;
    return this;
}
/**
 * 
 * @param {string} dir
 */
shell.at = function(dir){
    this.dir = path.normalize(dir);             
    this.cd  = true;
    return this;
}
/**
 * 
 * @param {*} options
 */
shell.setOptions = function(options){
    let newOptions = Object.keys(options);
    newOptions.forEach(function(val, index){
        this.options[val] = options[val];
    });
    this.hasOptions = true;
    return this;
}
/**
 * 
 * @param {string} shell
 */
shell.open = function(shell){
    let options = {
        stdio:    'ignore',
        detached: true,
        shell:    true
    }
    return child_process.spawn('start', [path.normalize(shell)], options).unref();
}
/**
 * 
 * 
 */
shell.create = function(){
    if(!this.hasOptions)
      this.options = this.defaults;
    if(this.isNode){
        const command = this.isNew
            ? 'start'
            : 'node';
        const parameters = this.isNew 
            ? ['node', this.nodeModule]
            : [this.nodeModule]; 
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];
        }
        if(this.cd)
          this.options.cwd = this.dir;
        if(this.isNew)
            this.options.detached = true;
            this.options.shell    = true;
        if(!this.ref)
          return child_process.spawn(command, parameters, this.options).unref();
        return child_process.spawn(command, parameters, this.options);
    }
    if(this.willExec){
        if(this.cd)
          this.options.cwd = this.dir;
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];
        }
        if(!this.ref)
          return child_process.spawn(this.script, [],this.options).unref();
        return child_process.spawn(this.script, [],this.options);      
    }
}
/**
 * 
 * 
 */
let createShell = function(){
    let customshell = Object.create(shell);
    return customshell;
}

module.exports = createShell;