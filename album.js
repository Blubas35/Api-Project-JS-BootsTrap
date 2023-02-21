import { createPageMainHeader } from './header.js'
import { firstLetterUpperCase } from "./function.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.before(createPageMainHeader())
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('album_id')

    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`)
    const album = await res.json()

    let { title, photos, user } = album

    const albumWrapper = document.createElement('div')
    albumWrapper.classList.add('album-wrapper')

    const albumTitle = document.createElement('h2')
    albumTitle.classList.add('album-title')
    albumTitle.textContent = firstLetterUpperCase(title)

    const albumAuthorWrapper = document.createElement('div')
    albumAuthorWrapper.classList.add('album-author-wrapper')
    albumAuthorWrapper.textContent = 'Author: '

    const albumAuthorLink = document.createElement('a')
    albumAuthorLink.classList.add('author-link')
    albumAuthorLink.textContent = `${user.name}`
    albumAuthorLink.href = `./user.html?user_id=${user.id}`
    albumAuthorWrapper.append(albumAuthorLink)

    const photosWrapper = document.createElement('div');
    photosWrapper.classList.add('my-gallery');

    photos.map(photo => {

        let { title, thumbnailUrl, url } = photo

        const photoLink = document.createElement('a');
        photoLink.href = url;
        photoLink.title = firstLetterUpperCase(title);

        const photoImg = document.createElement('img');
        photoImg.src = thumbnailUrl;

        photoLink.appendChild(photoImg);
        photosWrapper.appendChild(photoLink);

    })
    albumWrapper.append(albumTitle, albumAuthorWrapper)
    pageContent.append(albumWrapper, photosWrapper)

    const gallery = new PhotoSwipe(document.querySelector('.my-gallery'), PhotoSwipeUI_Default, album.photos, {
        index: 0,
        bgOpacity: 0.9,
        history: false,
        showHideOpacity: true
    });
    gallery.init();
}

init()