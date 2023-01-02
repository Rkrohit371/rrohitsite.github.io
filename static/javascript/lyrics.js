const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artists
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    
    showData(data);
}

// Show song and artist in DOM
function showData(data) {
    // let output = ''

    // data.data.forEach(song => {
    //     output += `
    //     <li>
    //         <span><strong>${song.artist.name} - ${song.title}</strong></span>
    //         <button class="btn" data-artist="${song.artist.name} data-songtitle="${song.title}">Get Lyrics</button>
    //     </li>
    //     `
    // });

    // result.innerHTML = `
    // <ul class="songs">
    // ${output}
    // </ul>
    // `;

    result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song => `<li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`).join('')}
    </ul>
    `;

    if(data.prev || data.next) {
        more.innerHTML = `${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`: ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`: ''}`;
    } else {
        more.innerHTML = '';
    }
}

// Get previous/Next songs
async function getMoreSongs(url) {
    const res = await fetch(`http://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    // console.log(lyrics);
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

    more.innerHTML = '';
}

// Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if(!searchTerm) {
        alert('Please type in a search term.');
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target;
    // console.log(e.target);
    if(clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');
        // console.log(e.target);
        getLyrics(artist, songTitle);
    }
});