"use strict";
/**
 * @fileOverview The Tree constructor
 * @author <a href="mailto:awpatterson217@gmail.com">Adam Patterson</a>
 * @version 1.0.7
 */
const fs           = require('fs');
const path         = require('path');
const util         = require('util');
const EventEmitter = require('events').EventEmitter;
/** @Tree */
module.exports = Tree;
/**
 * Creates an instance of Tree.
 * @constructor
 */
function Tree(){
/**
 * @property {Object} files List of all files
 * @property {Object} dir Uses directories as keys, booleans as values
 * @property {Object} dirExt Uses directories as keys, booleans as values, for getLeaves()
 * @property {Array} ignored Directories to ignore
 * @property {Array} ignoredExt Extra list of directories to ignore for getLeaves()
 * @property {Array} exts Extensions to match
 * @property {Object} extMatched Extensions that have matched
 * @property {Array} errors An error object with the properties dir, and msg
 * @property {Array} errorsExt An error object with the properties dir, and msg for getLeaves()
 **/
    this.files      = [];
    this.dir        = {};
    this.dirExt     = {};
    this.ignored    = [];
    this.ignoredExt = [];
    this.exts       = [];
    this.extMatched = {};
    this.errors     = [];
    this.errorsExt  = [];

    EventEmitter.call(this);         
/**
  * Listens for directories and runs getBranch()
  * @listens module:Tree~dir
  */
    this.on('dir', dir => this.getBranch(dir) );
/**
  * Listens for directories and runs getLeaves()
  * @listens module:Tree~filePath
  */
    this.on('dirFound', dir => this.getLeaves(dir) );
/**
  * Recursively returns all directories
  * @method
  * @param {string} dir The root dir
  * @param {Array} ignored Directories to be ignored
  */
    this.getBranch = function(dir, ignored = []){
        const dirPath = fs.realpathSync(dir);
        this.ignore(ignored);
        if(this.shouldIgnore(dirPath)) 
            return;
        this.dir[dirPath] = false;
        fs.readdir(dirPath, (err, items) => {
            if(err){
                this.errors.push({
                    err: err,
                    path: dirPath
                });
            }
            if(!(items === null || undefined)) 
                this.findDir(dirPath, items);
            this.dir[dirPath] = true;
            this.complete();
        });
        return;
    }
/**
  * Recursively returns all matching files
  * @method
  * @param {string} dir The root dir
  * @param {Array} extensions Extensions to match
  * @param {Array} ignored Directories to be ignored
  */
    this.getLeaves = function(dir, extensions = [], ignored = []){
        const dirPath = fs.realpathSync(dir);
        this.ignoreExt(ignored);
        this.ext(extensions);
        if(this.shouldIgnoreExt(dirPath))
            return;
        this.dirExt[dirPath] = false;
        fs.readdir(dirPath, (err, items) => {
            if(err){
                this.errorsExt.push({
                    err: err,
                    path: dirPath
                });
            }
            if(!(items === null || undefined))                  
                 this.findExt(dirPath, items); 
            this.dirExt[dirPath] = true;
            this.completeExt();
        });
        return;
    }
/**
  * Checks if each item in an array of items is a directory
  * @see getBranch()
  * @method
  * @param {string} dirPath The root dir
  * @param {Array} items items to check
  * @fires module:Tree~dir
  */
    this.findDir = function(dirPath, items){
        items.map( item => {
            return path.join(dirPath, item);
        }).filter( path => {
            try {
                return fs.statSync(path).isDirectory();
            } catch (err) {
                this.errors.push({
                    err: err,
                    path: path
                });                
            }
        }).forEach( directory => {
            this.emit('dir', directory);             
        });
        return;
    }
/**
  * Checks if each item in an array of items is a directory
  * Calls isMatch() to check for extensions
  * @see getLeaves()
  * @method
  * @param {string} dirPath The root dir
  * @param {Array} items items to check
  * @fires module:Tree~dirFound
  */
    this.findExt = function(dirPath, items){
        items.map( item => {
            return path.join(dirPath, item);
        }).filter( path => {
            try {
                this.isMatch(path);
                return fs.statSync(path).isDirectory();
            } catch (err) {
                this.errorsExt.push({
                    err: err,
                    path: path
                });
            }
        }).forEach( directory => {
            this.emit('dirFound', directory);
        });
        return;
    }
/**
  * Formats and stores an array of directories to ignore
  * @see getBranch()
  * @method
  * @param {Array} ignored Directories to be ignored
  */
    this.ignore = function(ignored){
        let ignoredPath;
        if(Array.isArray(ignored)){
            if(ignored.length){                
                ignoredPath = ignored.map( ignoree => {
                    return fs.realpathSync(ignoree);
                });            
                this.ignored = [...ignoredPath];
            }
        }
        return;
    }
/**
  * Formats and stores an array of directories to ignore
  * @see getLeaves()
  * @method
  * @param {Array} ignored Directories to be ignored
  */
    this.ignoreExt = function(ignored){
        let ignoredPath;
        if(Array.isArray(ignored)){
            if(ignored.length){
                ignoredPath = ignored.map( ignoree => {
                    return fs.realpathSync(ignoree);
                });            
                this.ignoredExt = [...ignoredPath];
            }
        }
        return;
    }
/**
  * Stores an array of extensions to match
  * @method
  * @param {Array} extensions Extensions to match
  */
    this.ext = function(extensions){
        if(Array.isArray(extensions)){
            if(extensions.length)
                this.exts = [...extensions];
        }
        return;
    }
/**
  * Should this directory be ignored?
  * @see getBranch()
  * @method 
  * @param {string} dirPath The directory to check
  * @return {boolean} shouldIgnore
  */
    this.shouldIgnore = function(dirPath){
        let shouldIgnore = false;
        this.ignored.forEach( ignoree => {
            if(dirPath === ignoree) 
                shouldIgnore = true;
        });
        return shouldIgnore;
    }
/**
  * Should this directory be ignored?
  * @see getLeaves()
  * @method
  * @param {string} dirPath The directory to check
  * @return {boolean} shouldIgnore
  */
    this.shouldIgnoreExt = function(dirPath){
        let shouldIgnore = false;
        this.ignoredExt.forEach( ignoree => {
            if(dirPath === ignoree) 
                shouldIgnore = true;
        });
        return shouldIgnore;
    }
/**
  * Checks if all of the directories found 
  * have been searched
  * @see getBranch()
  * @method 
  * @fires module:Tree~gathered
  * @return {boolean}
  */
    this.complete = function(){
        let complete = true;
        let dir      = Object.keys(this.dir);
        dir.forEach((directory) => {
            if(!this.dir[directory]) 
                complete = false;
        });
        if(!complete) 
            return false;
        this.emit(
            'gathered',
            this.errors,
            dir
        );
        return true;
    }
/**
  * Checks if all of the directories found 
  * have been searched
  * @see getLeaves()
  * @method
  * @fires module:Tree~autumn
  * @return {boolean}
  */
    this.completeExt = function(){
        let complete   = true;
        let dirExt     = Object.keys(this.dirExt);
        let MatchedExt = Object.keys(this.extMatched);
        dirExt.forEach((directory) => {
            if(!this.dirExt[directory]) 
                complete = false;
        });
        if(!complete) 
            return false;
        this.emit(
            'autumn', 
            this.errorsExt,
            this.files,
            MatchedExt
        );
        return true;
    }
/**
   * Checks if the extension matches user's choice
   * @method
   * @param {string} filePath Full path to the file to check
   * @fires module:Tree~file
   */
    this.isMatch = function(filePath){
        let fileExt = path.extname(filePath);
        let dirname = path.dirname(filePath)        
        this.exts.forEach( ext => {
            if(fileExt === ext){
                this.files.push(filePath);
                this.extMatched[ext] = true;
                this.emit(
                    'file',
                    filePath,
                    dirname,
                    ext
                );
            } 
            return;
        });
        return;
    }
};
/**
* Tree extends the EventEmitter class.
* @extends EventEmitter
* @see EventEmitter <a href="https://nodejs.org/dist/latest-v8.x/docs/api/events.html#events_class_eventemitter">EventEmitter</a>
*/
util.inherits(Tree, EventEmitter);
