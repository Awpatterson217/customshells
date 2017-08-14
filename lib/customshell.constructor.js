const child_process = require('child_process');
const fs            = require('fs');
const path          = require('path');

module.exports.CustomShell = CustomShell;

function CustomShell(){

    this.defaults = {
        stdio:    'pipe',
        detached: false,
        shell:    false
    }

    this.options    = {};
    this.ref        =  true;
    this.hasOptions = false;
    this.isNode     = false;
    this.isNew      = false;
    this.willExec   = false;
    this.hasFile    = false;
    this.hasTree    = false;
    this.cd         = false;
}
/**
 *  Can create file at runtime, Flag 'a', 
 *  see: https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback
 * 
 * @param {string} file
 * @param {string} flag
 * 
 */
CustomShell.prototype.toFile = function(file, flag = 'a'){
    this.flag    = flag;
    this.file    = path.normalize(file);
    this.hasFile = true;
    return this;
}
/**
 * 
 *
 */
CustomShell.prototype.new = function(){
    this.isNew = true;
    this.ref   = false;
    return this;
}
/**
 * 
 * @param {string} nodeModule
 */
CustomShell.prototype.node = function(nodeModule){
    this.nodeModule = path.normalize(nodeModule);
    this.isNode     = true;
    return this;
}
/**
 * 
 * @param {string} script
 */
CustomShell.prototype.execute = function(script){
    this.script   = path.normalize(script);       // TO DO
    this.willExec = true;
    return this;
}
/**
 * 
 * @param {string} dir
 */
CustomShell.prototype.tree = function(dir){
    this.dir     = path.normalize(dir);          // TO DO
    this.hasTree = true;
    return this;
}
/**
 * 
 * @param {string} dir
 */
CustomShell.prototype.at = function(dir){
    this.dir = path.normalize(dir);             
    this.cd  = true;
    return this;
}
/**
 * 
 * @param {*} options
 */
CustomShell.prototype.setOptions = function(options){
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
CustomShell.prototype.open = function(shell){
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
CustomShell.prototype.create = function(){
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
