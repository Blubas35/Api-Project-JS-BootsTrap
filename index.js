import { createPageMainHeader } from "./header.js";
import { API_URL } from "./config.js";
import { firstLetterUpperCase, fetchData } from "./function.js";


async function init() {
    const pageContent = document.querySelector('#page-content');

    pageContent.before(createPageMainHeader())
    const heroBoxElement = document.createElement('div')
    heroBoxElement.classList.add('masthead', 'd-flex', 'justify-content-center')
    heroBoxElement.style.backgroundImage = 'url(./images/pexels-gradienta-7135053.jpg)'
    const heroBoxContentWrapper = document.createElement('div')
    heroBoxContentWrapper.classList.add('align-self-center')
    const heroBoxContent = document.createElement('div')
    heroBoxContent.classList.add()
    const heroBoxTitle = document.createElement('h1')
    heroBoxTitle.classList.add()
    heroBoxTitle.textContent = 'Landing Page Title'

    heroBoxContent.append(heroBoxTitle)
    heroBoxContentWrapper.append(heroBoxContent)
    heroBoxElement.append(heroBoxContentWrapper)

    const container = document.createElement('div')
    container.classList.add('container')

    const mainContent = document.createElement('main')
    mainContent.classList.add('main-content')
    const divElement = document.createElement('div')
    divElement.classList.add('row')
    const userElement = document.createElement('div')
    userElement.classList.add('user-wrapper', 'col-xl-4')
    const postElement = document.createElement('div')
    postElement.classList.add('post-wrapper')
    const albumsElement = document.createElement('div')
    albumsElement.classList.add('albums-wrapper', 'col-xl-8')
    const commentsElement = document.createElement('div')
    commentsElement.classList.add('comments-wrapper')
    const commentsList = document.createElement('ul')
    commentsList.classList.add('comments-list')
    const carouselTitle = document.querySelector('#carousel-title')
    const carouselItem1 = document.querySelector('#carousel-item-1')
    const carouselItem2 = document.querySelector('#carousel-item-2')
    const carouselItem3 = document.querySelector('#carousel-item-3')

    async function createUserElement() {
        const userResults = await fetchData(`${API_URL}/users?_limit=5`)

        const userResultTitle = document.createElement('h3')
        userResultTitle.classList.add('user-result-title')
        userResultTitle.textContent = `Top 5 contributed users: `

        userElement.prepend(userResultTitle)

        userResults.forEach(result => {
            const firstName = result.name
            const id = result.id

            const userResult = document.createElement('p')
            userResult.classList.add('user-result')

            const userProfilePic = document.createElement('img')
            userProfilePic.src = './images/user-profile.png'
            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link')
            resultLink.textContent = firstName
            resultLink.href = `./user.html?user_id=${id}`

            resultLink.append(userProfilePic)
            userResult.append(resultLink)
            userElement.append(userResult)
        })
    }
    await createUserElement()

    async function createPostElement() {

        const resultsPosts = await fetchData(`${API_URL}/posts?_limit=3&_expand=user`)
        const postResultTitle = document.createElement('h3')
        // postResultTitle.classList.add('post-result-title')
        // postResultTitle.textContent = `Top posts of the month: `
        carouselTitle.textContent = `Top posts of the month:`

        console.log(resultsPosts)
        postElement.prepend(postResultTitle)
        const postList = document.createElement('ul')
        postList.classList.add('post-list')

        document.creat

        carouselItem1.append(resultsPosts[0].title)

        resultsPosts.forEach(post => {
            const id = post.id
            const userId = post.userId
            const title = post.title
            const comments = post.comments


            const postItem = document.createElement('li')
            postItem.classList.add('post-item')

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link')
            resultLink.textContent = firstLetterUpperCase(title)
            resultLink.href = `./post.html?post_id=${id}`

            const postItemDescription = document.createElement('span')
            postItemDescription.classList.add('post-item-description')
            postItemDescription.textContent = `. Written by: `

            const postItemDescriptionLink = document.createElement('a')
            postItemDescriptionLink.textContent = post.user.name
            postItemDescriptionLink.href = `./user.html?user_id=${userId}`

            postItem.append(resultLink, postItemDescription, postItemDescriptionLink)
            postList.append(postItem)
            // carouselItem1.append(postItem)
        })


        postElement.append(postList)
    }
    await createPostElement()

    async function createAlbumElement() {

        const resultsAlbums = await fetchData(`${API_URL}/albums?&_limit=10&_expand=user&_embed=photos`)

        const albumsFound = resultsAlbums.length
        const albumsResultWrapper = document.createElement('div')
        albumsResultWrapper.classList.add('albums-result-wrapper', 'previous')
        const albumsResultTitle = document.createElement('h3')
        albumsResultTitle.classList.add('post-result-title')
        albumsResultTitle.textContent = `Most popular albums: `
        const albumList = document.createElement('ul')
        albumList.classList.add('album-list')

        albumsElement.prepend(albumsResultTitle)

        resultsAlbums.forEach(album => {
            const id = album.id
            const userId = album.userId
            const name = album.user.name
            const title = album.title
            const photosArr = album.photos

            const albumItem = document.createElement('li')
            albumItem.classList.add('album-item')

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link')
            resultLink.textContent = firstLetterUpperCase(title)
            resultLink.href = `./album.html?album_id=${id}`

            const albumItemDescription = document.createElement('span')
            albumItemDescription.classList.add('album-item-description')
            albumItemDescription.textContent = `. Made by: `

            const albumItemDescriptionLink = document.createElement('a')
            albumItemDescriptionLink.textContent = name
            albumItemDescriptionLink.href = `./user.html?user_id=${userId}`

            const imageWrapper = document.createElement('img')

            photosArr.map(photo => {
                imageWrapper.src = `${photo.thumbnailUrl}`
            })
            resultLink.append(imageWrapper)
            albumItem.append(resultLink, albumItemDescription, albumItemDescriptionLink)
            albumList.append(albumItem)

            albumsElement.append(albumList)
        })
    }
    await createAlbumElement()
    divElement.append(albumsElement, userElement)
    mainContent.append(postElement, divElement)
    container.append(mainContent)
    pageContent.append(container)
    pageContent.before(heroBoxElement)
}

init()
