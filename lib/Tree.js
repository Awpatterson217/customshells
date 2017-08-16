"use strict";
/**
 * @fileOverview The Tree constructor
 * @author <a href="mailto:awpatterson217@gmail.com">Adam Patterson</a>
 * @version 1.0.0
 */
const fs           = require('fs');
const path         = require('path');
const util         = require('util');
const EventEmitter = require('events').EventEmitter;

/** @Tree */
module.exports = Tree;

/**
 * Creates an instance of Tree.
 *
 * @constructor
 * @this {Tree}
 */
function Tree(){
/**
 * @property {Object} directories List of all directories
 * @property {Array} ignored Directories to ignore
 * @property {Object} errors Unique errors
 * @typedef {Array} errors.statSync
 **/
    this.directories = {};
    this.ignored     = [];
    this.errors      = {
        statSync: []
    }               
/**
  * Searches each directory found for more directories.
  *
  * @this {Tree}
  */
    this.on('dir', dir => this.getBranch(dir) );

/**
 * Searches through a directory tree recursively.
 *
 * @this {Tree}
 * @param {string} dir The root folder
 * @param {Array} ignored Specifies directories to be ignored
 */
    this.getBranch = function(dir, ignored = []){
        const dirPath = fs.realpathSync(dir);
        this.ignore(ignored);
        if(this.shouldIgnore(dirPath)) return;
        this.directories[dirPath] = false;
        fs.readdir(dirPath, (err, items) => {
            //if(err) // TODO: emit error
            if(!(items === null) && !(items === undefined)){
                if (!items.length) this.directories[dirPath] = true;
                items.map( item => path.join(dirPath, item) )
                .filter( path => {
                    try {
                        return fs.statSync(path).isDirectory();
                    } catch (err) {
                        this.errors.statSync.push(err);
                    }
                }).forEach( directory => this.emit('dir', directory));
            }
            this.directories[dirPath] = true;
            let assumeComplete = true;
            let directories = Object.keys(this.directories);
            directories.forEach( (directory) => {
                if(!this.directories[directory]) assumeComplete = false;
            });
            if(!assumeComplete) return;
            this.emit('gathered', directories.length, this.errors.statSync.length, this.errors.statSync);
            return;
        });
        return;
    }

/**
 * Formats and stores an array of directories to ignore.
 *
 * @this {Tree}
 * @param {Array} ignored Specifies directories to be ignored
 */
    this.ignore = function(ignored){
        if(Array.isArray(ignored) && ignored.length){
            let ignoredPath = ignored.map( ignoree => fs.realpathSync(ignoree) );            
            this.ignored = [...ignoredPath];
        }
    }
/**
 * Checks current directory to be searched against
 * directories designated as ignore.
 * 
 * @this {Tree}
 * @param {string} dirpath The current directory to check
 * @return {boolean} shouldIgnore
 */
    this.shouldIgnore = function(dirPath){
        let shouldIgnore = false;
        this.ignored.forEach( ignoree => {
            if(dirPath === ignoree) shouldIgnore = true;
        });
        return shouldIgnore;
    }

};
/**
 * Tree extends the EventEmitter class.
 ** @extends EventEmitter
  * @see EventEmitter <a href="https://nodejs.org/dist/latest-v8.x/docs/api/events.html#events_class_eventemitter">EventEmitter</a>

 */
util.inherits(Tree, EventEmitter);
