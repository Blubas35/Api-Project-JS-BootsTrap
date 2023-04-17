import { createPageMainHeader } from "./Components/header.js";
import { createHeroBox } from "./Components/heroBox.js";
import { createFooter } from "./Components/footer.js";
import { API_URL } from "./config.js";
import { firstLetterUpperCase, fetchData} from "./function.js";

async function init() {
    const pageContent = document.querySelector('#page-content');
    pageContent.classList.add('px-6', 'px-4')

    // header and hero box stuff

    pageContent.before(createPageMainHeader())
    pageContent.before(createHeroBox('JSON placeholder website', {backgroundImage: 'url(./images/hero-box-bg.jpg)'}))
    pageContent.after(createFooter())

    const container = document.createElement('div')
    container.classList.add('container')

    // creating main content wrappers (albums, users, post & row/col)

    const mainContent = document.createElement('main')
    mainContent.classList.add('main-content')
    const divElement = document.createElement('div')
    divElement.classList.add('row', 'justify-content-center')
    const postResultTitle = document.createElement('h2')
    postResultTitle.classList.add('post-title', 'p-3', 'fs-1', 'text-dark', 'fw-bolder')
    postResultTitle.textContent = `Top post of the month:`
    const divElement2 = document.createElement('div')
    divElement2.classList.add('d-flex', 'flex-column', 'gap-5')
    const colPostElement = document.createElement('div')
    colPostElement.classList.add('col-xl-10', 'col-lg-10')
    const rowAlbumUserWrapper = document.createElement('div')
    rowAlbumUserWrapper.classList.add('row', 'gx-5')
    const userPostDiv = document.createElement('div')
    userPostDiv.classList.add('col-xl-4')
    const userElement = document.createElement('div')
    userElement.classList.add('user-wrapper', 'mx-auto', 'me-md-auto', 'shadow-sm', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded')
    const postWrapper = document.createElement('div')
    postWrapper.classList.add('post-content-wrapper', 'col-md-6', 'col-12', 'd-flex', 'flex-column', 'row-gap-3', 'p-4' )
    const postElement = document.createElement('div')
    postElement.classList.add('post-wrapper', 'row', 'shadow-sm', 'mb-5', 'bg-body-tertiary', 'rounded')
    const postImageWrapper = document.createElement('div')
    postImageWrapper.classList.add('post-image', 'col-md-6', 'col-12')
    postImageWrapper.style.backgroundImage = 'url("https://images.unsplash.com/photo-1558174685-430919a96c8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")'
    const albumsElement = document.createElement('div')
    albumsElement.classList.add('albums-wrapper', 'col-xl-8', 'shadow-sm', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded')
    const commentsElement = document.createElement('div')
    commentsElement.classList.add('comments-wrapper')
    const commentsList = document.createElement('ul')
    commentsList.classList.add('comments-list')

    divElement2.append(userElement)
    userPostDiv.append(divElement2)

    // creating users element using api

    async function createUserElement() {
        const userResults = await fetchData(`${API_URL}/users?_limit=5`)

        const userResultTitle = document.createElement('h3')
        userResultTitle.classList.add('user-result-title', 'fs-4', 'text-dark', 'fw-bolder')
        userResultTitle.textContent = `Top 5 contributed users: `

        userElement.prepend(userResultTitle)

        userResults.forEach(result => {
            const firstName = result.name
            const id = result.id

            const userResult = document.createElement('p')
            userResult.classList.add('user-result')

            const userProfilePic = document.createElement('img')
            userProfilePic.src = './images/user-profile.png'
            userProfilePic.classList.add('user-profile-pic')
            userProfilePic.setAttribute('alt', 'profile picture')
            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link', 'post-author-link', 'd-flex', 'flex-row-reverse', 'justify-content-end')
            resultLink.textContent = firstName
            resultLink.href = `./user.html?user_id=${id}`

            resultLink.append(userProfilePic)
            userResult.append(resultLink)
            userElement.append(userResult)
        })
    }
    await createUserElement()

    // creating post element using api

    async function createPostElement() {

        const resultsPosts = await fetchData(`${API_URL}/posts?_limit=3&_expand=user`)
        console.log(resultsPosts)
        const postListTitle = document.createElement('a')
        postListTitle.classList.add('post-link-title', 'fs-4', 'text-decoration-none', 'text-dark', 'fw-bolder')
        postListTitle.textContent = firstLetterUpperCase(resultsPosts[0].title)
        postListTitle.href = './post.html?post_id=' + resultsPosts[0].id
        const postList = document.createElement('p')
        postList.classList.add('post-content','fw-lighter')
        postList.textContent = firstLetterUpperCase(resultsPosts[0].body)
        const postButton = document.createElement('a')
        postButton.classList.add('post-author-link')
        postButton.textContent = 'Read more'
        postButton.href = './post.html?post_id=' + resultsPosts[0].id
        postWrapper.append(postListTitle, postList, postButton)
    }
    await createPostElement()

    // creating album element using api

    async function createAlbumElement() {

        const resultsAlbums = await fetchData(`${API_URL}/albums?&_limit=10&_expand=user&_embed=photos`)

        const albumsFound = resultsAlbums.length
        const albumsResultWrapper = document.createElement('div')
        albumsResultWrapper.classList.add('albums-result-wrapper', 'previous')
        const albumsResultTitle = document.createElement('h3')
        albumsResultTitle.classList.add('post-result-title', 'p-3', 'fs-1', 'text-dark', 'fw-bolder')
        albumsResultTitle.textContent = `Most popular albums: `
        const albumList = document.createElement('ul')
        albumList.classList.add('album-list', 'row')

        albumsElement.prepend(albumsResultTitle)

        resultsAlbums.forEach(album => {
            const id = album.id
            const userId = album.userId
            const name = album.user.name
            const title = firstLetterUpperCase(album.title)
            const photosArr = album.photos

            const albumItem = document.createElement('li')
            albumItem.classList.add('album-item', 'd-flex', 'flex-column', 'col-3', 'gap-3', 'pb-5', 'justify-content-between',)

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link', 'post-author-link', 'd-flex', 'flex-column', 'align-items-start', 'gap-3')
            const albumTitleElement = document.createElement('span')
            albumTitleElement.textContent = title
            // albumTitleElement.textContent = textTruncate(title, 20)
            albumTitleElement.classList.add('w-100', 'text-truncate')
            resultLink.href = `./album.html?album_id=${id}`
            resultLink.style.maxWidth = '200px'

            const albumItemDescriptionWrapper = document.createElement('div')
            albumItemDescriptionWrapper.classList.add('div')
            const albumItemDescription = document.createElement('span')
            albumItemDescription.classList.add('album-item-description')
            albumItemDescription.textContent = `Made by: `

            const albumItemDescriptionLink = document.createElement('a')
            albumItemDescriptionLink.classList.add('post-author-link')
            albumItemDescriptionLink.textContent = name
            albumItemDescriptionLink.href = `./user.html?user_id=${userId}`

            const imageWrapper = document.createElement('img')
            imageWrapper.setAttribute('alt', 'album cover')
            imageWrapper.classList.add('album-pic')

            photosArr.map(photo => {
                imageWrapper.src = `${photo.thumbnailUrl}`
            })
            albumItemDescriptionWrapper.append(albumItemDescription, albumItemDescriptionLink)
            resultLink.append(albumTitleElement, imageWrapper)
            albumItem.append(resultLink, albumItemDescriptionWrapper)
            albumList.append(albumItem)

            albumsElement.append(albumList)
        })
    }
    await createAlbumElement()

    // appending everything

    rowAlbumUserWrapper.append(albumsElement, userPostDiv)
    postElement.append(postWrapper, postImageWrapper)
    colPostElement.append(postResultTitle, postElement, rowAlbumUserWrapper)
    postResultTitle
    divElement.append(colPostElement)
    mainContent.append(divElement)
    container.append(mainContent)
    pageContent.append(container)
}

init()
