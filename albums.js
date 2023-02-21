// https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15
import { firstLetterUpperCase } from './function.js';
import { createPageMainHeader } from './header.js'

async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user');
    const albums = await res.json();

    if (!albums.length || albums.length === 0) {
        return;
    }

    const pageContent = document.querySelector('#page-content');
    const albumsList = createAlbumsListElement(albums);
   
    pageContent.append(albumsList);
    pageContent.before(createPageMainHeader());
}

function createAlbumsListElement(albums) {
    const albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');
    const albumsListTitle = document.createElement('h2') 
    albumsListTitle.classList.add('albums-title')
    albumsListTitle.textContent = 'Featured albums:'

    albumsList.append(albumsListTitle)

    albums.map(album => {
        const albumItem = createAlbumItemElement(album);
        albumsList.append(albumItem);
    })

    return albumsList;
}

function createAlbumItemElement(album) {
    const title = firstLetterUpperCase(album.title);
    const name = album.user.name;
    const photosNumber = album.photos.length;
    const randomIndex = Math.floor(Math.random() * album.photos.length);
    const randomPhoto = album.photos[randomIndex];

    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');

    const albumItemLink = document.createElement('a');
    albumItemLink.href = `./album.html?album_id=${album.id}`;

    const photoElement = document.createElement('img');
    photoElement.src = randomPhoto.thumbnailUrl;
    photoElement.title = randomPhoto.title;

    const albumText = document.createElement('div')
    albumText.classList.add('album-text')
    const albumTitle = document.createElement('h3');
    albumTitle.textContent = `${title} (${photosNumber}). `;
    const spanElement = document.createElement('span')
    spanElement.textContent = `Author: ${name}`

    albumText.append(albumTitle, spanElement)

    albumItemLink.append(photoElement, albumText);
    albumItem.append(albumItemLink);

    return albumItem;
}

init();
