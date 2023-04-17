// https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15
import { firstLetterUpperCase, textTruncate } from './function.js';
import { createPageMainHeader } from './Components/header.js'
import { createFooter } from "./Components/footer.js";

async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=15&_embed=photos&_expand=user');
    const albums = await res.json();

    if (!albums.length || albums.length === 0) {
        return;
    }

    const pageContent = document.querySelector('#page-content');
    const albumsList = createAlbumsListElement(albums);
    pageContent.classList.add('px-6', 'px-4')
   
    pageContent.append(albumsList);
    pageContent.before(createPageMainHeader());
    pageContent.after(createFooter())
    
}

function createAlbumsListElement(albums) {
    const albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');
    const albumsListTitle = document.createElement('h2') 
    albumsListTitle.classList.add('albums-title', 'fs-1', 'fw-bolder', 'mb-5')
    albumsListTitle.textContent = 'Featured albums:'

    albumsList.append(albumsListTitle)

    const rowElement = document.createElement('div')
    rowElement.classList.add('row', 'gap-4')

    albums.map(album => {
        const albumItem = createAlbumItemElement(album);
        rowElement.append(albumItem)
        albumsList.append(rowElement);
    })

    return albumsList;
}

function createAlbumItemElement(album) {
    const title = firstLetterUpperCase(album.title);
    const name = album.user.name;
    const photosNumber = album.photos.length;
    const randomIndex = Math.floor(Math.random() * album.photos.length);
    const randomPhoto = album.photos[randomIndex];

    const colElement = document.createElement('div')
    colElement.classList.add('col-sm-auto', 'album-item')
    const albumItem = document.createElement('div');
    albumItem.classList.add('d-flex', 'flex-column', 'gap-2', 'h-100');

    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('image-wrapper')
    const photoLink = document.createElement('a')
    photoLink.classList.add('photo-link')
    photoLink.href = randomPhoto.thumbnailUrl
    photoLink.setAttribute('target', '_blank')
    const photoElement = document.createElement('img');
    photoElement.src = randomPhoto.thumbnailUrl;
    photoElement.title = randomPhoto.title;
    photoElement.setAttribute('alt', 'album cover')

    photoLink.append(photoElement)
    imageWrapper.append(photoLink)

    const albumText = document.createElement('div')
    albumText.classList.add('album-text', 'd-flex', 'flex-column', 'justify-content-between', 'h-100')
    const albumItemLink = document.createElement('a')
    albumItemLink.classList.add('album-link', 'text-decoration-none', 'text-dark')
    albumItemLink.href = `./album.html?album_id=${album.id}`
    const albumTitle = document.createElement('h3')
    albumTitle.classList.add('album-title', 'fs-6', 'fw-bolder')
    albumTitle.textContent = textTruncate(title, 25)
    
    const albumAuthorLink = document.createElement('a')
    albumAuthorLink.classList.add('author-link', 'text-decoration-none', 'text-secondary')
    albumAuthorLink.href = `./user.html?user_id=${album.user.id}`
    const spanElement = document.createElement('span')
    spanElement.classList.add('fs-7')
    spanElement.textContent = `Author: ${name}`

    albumAuthorLink.append(spanElement)
    albumItemLink.append(albumTitle)
    albumText.append(albumItemLink, albumAuthorLink)
    albumItem.append(imageWrapper, albumText);
    colElement.append(albumItem)

    return colElement;
}



init();
