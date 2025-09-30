//* Logica del reproductor//
import {media} from "./htmlelements.js";
export default {
    _pastSongs: [],
    _nextSongs: [],
    _controler: media,
    _progressBar: document.getElementById("progress"),
    initializePlayer(){
        this._progressBar.max = 100;
        this._progressBar.value = 0;
        this.initializeControlMedia(false);
        this._controler.addEventListener('mediaupdate', this._updateProgressBar.bind(this));
    },
   
    _updateProgressBar: function() {
        const progress_value = (this.currentTime / this.duration) * 100;
        this._progressBar.value = progress_value;
    },
   
   
    initializeControlMedia: function(play){
        if (play){
            this._controler.play();
        }
    },

    getNextSong: function(){
        return this._nextSongs.pop();
    },

    getPastSong: function(){
        return this._pastSongs.pop();
    },

    addToPast: function(song){
        this._pastSongs.push(song);
    },
    getNextSong: function(){
        return this._nextSongs.pop();
    },
    
    getPastSong: function(){
        return this._pastSongs.pop();
    },
    
    addToPast: function(song){
        this._pastSongs.push(song);
    },
    
    addToNext: function(song){
        this._nextSongs.push(song);
    },
    
    hasNextSong: function(){
        return this._nextSongs.length > 0;
    },
    
    hasPastSong: function(){
        return this._pastSongs.length > 0;
    }
}