"use strict";
/**
 * @fileOverview The customShell factory method.
 * @author <a href="mailto:awpatterson217@gmail.com">Adam Patterson</a>
 * @version 1.0.0
 */
const child_process = require('child_process');
const fs            = require('fs');
const path          = require('path');
const Tree        = require('./Tree');

let myTree = new Tree();

/** @customShell */
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
 * 
 * @this {shell}
 * @return {shell}
 */
shell.reset = function(){
    this.options    = {};
    this.ref        = true;
    this.hasOptions = false;
    this.isNode     = false;
    this.isNew      = false;
    this.willExec   = false;
    this.hasFile    = false;
    this.hasTree    = false;
    this.cd         = false;
    this.defaults   = {
        stdio:    'pipe',
        detached: false,
        shell:    false
    }
    return this;
}
/**
 * 
 * @this {myTree}
 * @param {string} file
 * @param {string} flag
 * @return {Object} shell
 */
shell.toFile = function(file, flag = 'a'){
    this.flag    = flag;
    this.file    = path.relative(process.cwd(), file);
    this.hasFile = true;
    return this;
}
/**
 * 
 * @this {shell}
 * @return {shell}
 */
shell.new = function(){
    this.isNew = true;
    this.ref   = false;
    return this;
}
/**
 * 
 * @this {shell}
 * @param {string} nodeModule
 * @return {shell}
 */
shell.node = function(nodeModule){
    this.nodeModule = fs.realpathSync(nodeModule);
    this.isNode     = true;
    return this;
}
/**
 * 
 * @this {shell}
 * @param {string} script
 * @return {shell}
 */
shell.execute = function(script){
    this.script = fs.realpathSync(script);
    this.willExec = true;
    return this;
}
/**
 * 
 * @this {shell}
 * @see {shell}
 * @param {string} dir
 * @return {shell}
 */
shell.tree = function(dir){
    this.dir = fs.realpathSync(dir);
    this.hasTree = true;                // IN PROGRESS
    return this;
}
/**
 * 
 * @this {shell}
 * @param {string} dir
 * @return {shell}
 */
shell.at = function(dir){
    this.dir = fs.realpathSync(dir);
    this.cd  = true;
    return this;
}                                               
/**
 * 
 * @this {shell}
 * @param {Object} options
 * @param {String} options.cwd
 * @param {String} options.env
 * @param {String} options.argv0
 * @param {String} options.stdio
 * @param {String} options.detached
 * @param {String} options.uid
 * @param {String} options.gid
 * @param {String} options.shell
 * @param {String} options.shell
 * @return {shell}
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
 * @param {string} shell Your favorite shell.
 * @see child_process <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
 * @return {child_process} 
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
 * @this {shell}
 * 
 */
shell.create = function(){
    if(!this.hasOptions)
      this.options = this.defaults;
    if(this.hasTree){

        // Having problems running modules in folders 
        // other than the folder the module is in.

        // execute() should work

    }
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
        if(this.isNew){
            this.options.detached = true;
            this.options.shell    = true;
        }
        if(this.cd)
          this.options.cwd = this.dir;
            if(!this.ref)
              return child_process.spawn(command, parameters, this.options).unref();
            return child_process.spawn(command, parameters, this.options);
    }
    if(this.willExec){
        if(this.cd)
          this.options.cwd = this.dir;
        if(this.isNew){
            this.options.detached = true;
            this.options.shell    = true;
        }
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
 * @return {shell} The new shell object.
 */
let createShell = function(){
    let customshell = Object.create(shell);
    return customshell;
}

module.exports = createShell;