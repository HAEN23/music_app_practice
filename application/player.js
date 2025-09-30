//* Logica del reproductor//
export default {
    _pastSongs: [],
    _nextSongs: [],
    
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