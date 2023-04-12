import { createPageMainHeader } from './header.js'
import { firstLetterUpperCase } from "./function.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.classList.add('px-6', 'px-4')
    pageContent.before(createPageMainHeader())
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('album_id')

    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`)

    const album = await res.json()
    
    let { title, photos, user } = album

    const albumWrapper = document.createElement('div')
    albumWrapper.classList.add('album-wrapper', 'mb-4')

    const albumTitle = document.createElement('h2')
    albumTitle.classList.add('album-title', 'fs-1', 'fw-bolder')
    albumTitle.textContent = firstLetterUpperCase(title)

    const albumAuthorWrapper = document.createElement('div')
    albumAuthorWrapper.classList.add('album-author-wrapper', 'text-secondary')
    albumAuthorWrapper.textContent = 'Author: '

    const albumAuthorLink = document.createElement('a')
    albumAuthorLink.classList.add('post-author-link', 'text-secondary')
    albumAuthorLink.textContent = `${user.name}`
    albumAuthorLink.href = `./user.html?user_id=${user.id}`
    albumAuthorWrapper.append(albumAuthorLink)

    const photosWrapper = document.createElement('div');
    photosWrapper.classList.add('my-gallery');

    const divWrapper = document.createElement('div')
    divWrapper.classList.add('row', 'row-gap-3')

    photos.slice(0, 15).map(photo => {

        let { title, thumbnailUrl } = photo

        const divElement = document.createElement('div')
        divElement.classList.add('col', 'xs-6')

        const photoLink = document.createElement('a');
        photoLink.href = thumbnailUrl;
        photoLink.title = firstLetterUpperCase(title);

        const photoImg = document.createElement('img');
        photoImg.src = thumbnailUrl;

        photoLink.appendChild(photoImg);
        divElement.append(photoLink)
        divWrapper.append(divElement)
        photosWrapper.appendChild(divWrapper);

    })
    albumWrapper.append(albumTitle, albumAuthorWrapper)
    pageContent.append(albumWrapper, photosWrapper)

}

init()