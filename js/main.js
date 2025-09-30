import createPlaylist from "./utils/playlist.js";

let progress_bar = document.getElementById("progress");
let media = document.getElementById("media");
let play_btn = document.getElementById("play");
const song_img = document.getElementById("song-img");
const lastest = document.getElementById("lastest");
const forward = document.getElementById("forward")

const songs = [
        {
            song_name : "Oh Lord",
            artist_name: "Foxy Shazam",
            song_url: "./media/Oh Lord - Foxy Shazam.mp3",
            caratula: "./media/1-2889d68a.png"
        },
        {
            song_name : "Eres Mía",
            artist_name: "Romeo Santos",
            song_url: "./media/Romeo Santos - Eres Mía.mp3",
            caratula: "./media/ab67706c0000da84008711051208af0862d31595.jpg"
        },
        {
            song_name : "Gold",
            artist_name: "Spandau Ballet",
            song_url: "./media/Spandau Ballet- Gold.mp3",
            caratula: "./media/images.jpg"
    
        },
        {
            song_name : "Calle Ocho",
            artist_name: "Pitbull",
            song_url: "./media/I Know You Want Me (Calle Ocho).mp3",
            caratula: "./media/Pitbull_i_know_you_want_me_cover.jpg"
        },
        {
            song_name: "Cuando Calienta El Sol",
            artist_name: "Luis Miguel",
            song_url: "./media/Luis Miguel — Cuando Calienta el Sol [Letra].mp3",
            caratula: "./media/Luismi.jpg"
        },
        {
            song_name: "Que los Cumplas Feliz",
            artist_name: "Cuarteto de Nos",
            song_url: "./media/Que-los-Cumpla-Feliz.mp3",
            caratula:"./media/revista.jpg"
        },
        {
            song_name: "I Gotta Feeling",
            artist_name: "The Black Eyed Peas",
            song_url: "./media/Black Eyed Peas - I Gotta Feeling (Audio).mp3",
            caratula:"./media/gotta.jpg"
        },
        {
            song_name: "Thrift Shop",
            artist_name: "Macklemore & Ryan Lewis",
            song_url: "./media/MACKLEMORE & RYAN LEWIS - THRIFT SHOP FEAT. WANZ (OFFICIAL VIDEO).mp3",
            caratula: "./media/thrift.jpg"

        },
        {
            song_name: "Que no quede huella",
            artist_name: "Bronco",
            song_url: "./media/Bronco - Que No Quede Huella (Cover Audio).mp3",
            caratula: "./media/bronco.jpg"
        },
    {
        song_name: "Queremos Pastel",
        artist_name: "Molotov",
        song_url:"./media/Queremos Pastel.mp3",
        caratula: "./media/DDD.jpg"
    },
    {
        song_name: "Gracias por tus Bits",
        artist_name: "HiSamHere",
        song_url:"./media/Gracias por tus bits (Original).mp3",
        caratula: "./media/GRACIAS POR TUS BITS.png"

    },
    {
        song_name: "Gangsta's Paradise",
        artist_name: "Coolio",
        song_url:"./media/Gangsta's Paradise.mp3",
        caratula: "./media/gangsta's.jpg"
    },

    ];

const last = [];

const playlist = createPlaylist(songs.length);

let playingNow;

window.addEventListener('DOMContentLoaded', () => {
    playingNow = playlist.pop()
    loadSong(playingNow);
    updatePlaylistDisplay();
})

function loadSong(i){
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");

    const now = songs[i];

    media.src = now.song_url;
    title.innerText = now.song_name;
    artist.innerText = now.artist_name;
    song_img.src = now.caratula;
}

media.addEventListener('loadedmetadata', () => {
    progress_bar.max = 100;
    progress_bar.value = 0;
    
    // Asegurar que el botón tenga el icono correcto al cargar
    if(!play_btn.classList.contains("pause")){
        play_btn.innerHTML = "<span>▶</span>";
    }
    
    if(play_btn.classList.contains("pause")){
        media.play();
    }
});

media.ontimeupdate = function updateProgressBar() {
    const progress_value = (this.currentTime / this.duration) * 100;
    progress_bar.value = progress_value;
}

// Función para pasar automáticamente a la siguiente canción cuando termine la actual
media.addEventListener('ended', () => {
    if(playlist.length > 0) {
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow);
        updatePlaylistDisplay();
        // Reproducir automáticamente la siguiente canción
        setTimeout(() => {
            media.play();
            play_btn.classList.remove("play");
            play_btn.classList.add("pause");
            play_btn.innerHTML = "<span>⏸</span>";
        }, 100);
    } else {
        // Si no hay más canciones, pausar y resetear el botón
        play_btn.classList.remove("pause");
        play_btn.classList.add("play");
        play_btn.innerHTML = "<span>▶</span>";
    }
});

lastest.addEventListener('click', function(){
    if(!last.length == 0){
        playlist.push(playingNow);
        playingNow = last.pop();
        loadSong(playingNow);
        updatePlaylistDisplay();
    }
});
forward.addEventListener('click', function(){
    if(!playlist.length == 0){
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow);
        updatePlaylistDisplay();
    }
});

progress_bar.oninput = function() {
    media.currentTime = (this.value/100) * media.duration;
}

play_btn.addEventListener("click", playPause);

function playPause(){
    if(play_btn.classList.contains("pause")){
        media.pause();
        play_btn.classList.remove("pause");
        play_btn.classList.add("play");
        play_btn.innerHTML = "<span>▶</span>"
    }else{
        media.play();
        play_btn.classList.remove("play");
        play_btn.classList.add("pause");
        play_btn.innerHTML = "<span>⏸</span>";
    }
}

function updatePlaylistDisplay() {
    const playlistContainer = document.querySelector('.playlist');
    playlistContainer.innerHTML = '';
    
    // Mostrar las próximas canciones en la playlist
    playlist.forEach((songIndex, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.innerHTML = `
            <div>
                <span class="song-name">${songs[songIndex].song_name}</span>
                <div style="font-size: 14px; color: #b3b3b3; margin-top: 5px;">${songs[songIndex].artist_name}</div>
            </div>
        `;
        
        // Agregar evento click para reproducir la canción
        playlistItem.addEventListener('click', () => {
            // Mover la canción actual a "last"
            last.push(playingNow);
            
            // Remover la canción seleccionada de la playlist
            const selectedSongIndex = playlist.splice(index, 1)[0];
            playingNow = selectedSongIndex;
            
            // Cargar y reproducir la canción seleccionada
            loadSong(playingNow);
            updatePlaylistDisplay();
            
            // Reproducir automáticamente la nueva canción
            setTimeout(() => {
                media.play();
                play_btn.classList.remove("play");
                play_btn.classList.add("pause");
                play_btn.innerHTML = "<span>⏸</span>";
            }, 100);
        });
        
        playlistContainer.appendChild(playlistItem);
    });
    
    // Si no hay más canciones en la playlist, mostrar mensaje
    if (playlist.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('playlist-item', 'empty');
        emptyMessage.innerHTML = '<span class="song-name">No hay más canciones en la cola</span>';
        playlistContainer.appendChild(emptyMessage);
    }
}

