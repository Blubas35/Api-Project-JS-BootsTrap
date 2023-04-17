import { createPageMainHeader } from "./Components/header.js";
import { fetchData, firstLetterUpperCase, getParams } from "./function.js";
import { API_URL } from "./config.js";

async function init() {

    const pageContent = document.querySelector('#page-content')
    const searchWord = getParams('search')

    pageContent.before(createPageMainHeader(false));

    const resultWrapper = document.createElement('div')
    resultWrapper.classList.add('result-wrapper')

    const selectElement = document.querySelector('.select-element')
    const submitButton = document.querySelector('.submit-button')

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault()
        
        const searchBar = document.querySelector('.search-input')
        const keyword = searchBar.value
        const searchCategory = selectElement.value.toLowerCase()

        const previousResults = document.querySelectorAll('.previous')
        previousResults.forEach(result => result.remove())

        if (searchCategory === 'posts') {
            await createPostElement(keyword)
        }

        if (searchCategory === 'albums') {
            await createAlbumElement(keyword)
        }

        if (searchCategory === 'users') {
            await createUserElement(keyword)
        } 
        if (searchCategory === 'all') {
            await createUserElement(keyword)
            await createPostElement(keyword)
            await createAlbumElement(keyword)
        }
    })

    async function createUserElement(word) {
        const userResults = await fetchData(`${API_URL}/users?q=${word}`)

        const usersFound = userResults.length
        const userResultWrapper = document.createElement('div')
        userResultWrapper.classList.add('user-result-wrapper', 'previous', 'shadow-sm', 'col-xl-6', 'col-lg-7', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')

        const userResultTitle = document.createElement('h3')
        userResultTitle.classList.add('user-result-title')
        userResultTitle.textContent = `${usersFound} Users found with keyword '${word}': `

        userResultWrapper.prepend(userResultTitle)

        userResults.forEach(result => {
            const firstName = result.name
            const id = result.id

            const userResult = document.createElement('p')
            userResult.classList.add('user-result')

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link', 'post-author-link', 'text-secondary')
            resultLink.textContent = firstName
            resultLink.href = `./user.html?user_id=${id}`

            userResult.append(resultLink)
            userResultWrapper.append(userResult)
            resultWrapper.append(userResultWrapper)
        })
    }
    await createUserElement(searchWord)

    async function createPostElement(word) {

        const resultsPosts = await fetchData(`${API_URL}/posts?q=${word}&_limit=10&_expand=user`)

        const postsFound = resultsPosts.length
        const postResultWrapper = document.createElement('div')
        postResultWrapper.classList.add('post-result-wrapper', 'previous', 'shadow-sm', 'col-xl-6', 'col-lg-7', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')
        const postResultTitle = document.createElement('h3')
        postResultTitle.classList.add('post-result-title')
        postResultTitle.textContent = `${postsFound} Posts found with keyword '${word}': `

        postResultWrapper.prepend(postResultTitle)
        const postList = document.createElement('ul')
        postList.classList.add('post-list')

        resultsPosts.forEach(post => {
            const id = post.id
            const userId = post.userId
            const title = post.title

            const postItem = document.createElement('li')
            postItem.classList.add('post-item')

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link', 'post-author-link')
            resultLink.textContent = firstLetterUpperCase(title)
            resultLink.href = `./post.html?post_id=${id}`

            const postItemDescription = document.createElement('span')
            postItemDescription.classList.add('post-item-description', 'text-secondary')
            postItemDescription.textContent = `. Written by: `

            const postItemDescriptionLink = document.createElement('a')
            postItemDescriptionLink.classList.add('post-author-link', 'text-secondary')
            postItemDescriptionLink.textContent = post.user.name
            postItemDescriptionLink.href = `./user.html?user_id=${userId}`

            postItem.append(resultLink, postItemDescription, postItemDescriptionLink)
            postList.append(postItem)

            postResultWrapper.append(postList)
            resultWrapper.append(postResultWrapper)
        })
    }
    await createPostElement(searchWord)

    async function createAlbumElement(word) {

        const resultsAlbums = await fetchData(`${API_URL}/albums?q=${word}&_limit=10&_expand=user`)

        const albumsFound = resultsAlbums.length
        const albumsResultWrapper = document.createElement('div')
        albumsResultWrapper.classList.add('albums-result-wrapper', 'previous', 'shadow-sm', 'col-xl-6', 'col-lg-7', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')
        const albumsResultTitle = document.createElement('h3')
        albumsResultTitle.classList.add('post-result-title')
        albumsResultTitle.textContent = `${albumsFound} Albums found with keyword '${word}': `
        const albumList = document.createElement('ul')
        albumList.classList.add('album-list')

        albumsResultWrapper.prepend(albumsResultTitle)

        resultsAlbums.forEach(album => {
            const id = album.id
            const userId = album.userId
            const name = album.user.name
            const title = album.title

            const albumItem = document.createElement('li')
            albumItem.classList.add('album-item')

            const resultLink = document.createElement('a')
            resultLink.classList.add('result-link', 'post-author-link')
            resultLink.textContent = firstLetterUpperCase(title)
            resultLink.href = `./album.html?album_id=${id}`

            const albumItemDescription = document.createElement('span')
            albumItemDescription.classList.add('album-item-description', 'text-secondary')
            albumItemDescription.textContent = `. Made by: `

            const albumItemDescriptionLink = document.createElement('a')
            albumItemDescriptionLink.classList.add('post-author-link', 'text-secondary')
            albumItemDescriptionLink.textContent = name
            albumItemDescriptionLink.href = `./user.html?user_id=${userId}`

            albumItem.append(resultLink, albumItemDescription, albumItemDescriptionLink)
            albumList.append(albumItem)

            albumsResultWrapper.append(albumList)
            resultWrapper.append(albumsResultWrapper)
        })
    }
    await createAlbumElement(searchWord)

    pageContent.append(resultWrapper)


    // if (usersFound === 0 && postsFound === 0 && albumsFound === 0) {
    // if (!searchWord) {
    // if (usersFound === 0 && postsFound === 0 && albumsFound === 0) {
    //     const errorMessageWrapper = document.createElement('div')
    //     errorMessageWrapper.classList.add('error-message-wrapper')
    //     const errorMessage = document.createElement('h3')
    //     errorMessage.classList.add('error-message')
    //     errorMessage.textContent = `0 results found with keyword '${searchWord}'`

    //     errorMessageWrapper.append(errorMessage)
    //     pageContent.append(errorMessageWrapper)
    //     return errorMessageWrapper
    // }
}
init()
