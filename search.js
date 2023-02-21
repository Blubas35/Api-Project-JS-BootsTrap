import { createPageMainHeader } from "./header.js";
import { fetchData, firstLetterUpperCase, getParams } from "./function.js";
import { API_URL } from "./config.js";

async function init() {

    const pageContent = document.querySelector('#page-content')
    const searchWord = getParams('search')
    console.log(searchWord)

    pageContent.before(createPageMainHeader(false));

    const resultWrapper = document.createElement('div')
    resultWrapper.classList.add('result-wrapper')

    // cia prie romano kodo
    // const allSearchResults = await renderAllSearchResults(searchWord);

    const selectElement = document.querySelector('.select-element')
    const submitButton = document.querySelector('.submit-button')

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault()

        const resultWrapper = document.createElement('div')
        resultWrapper.classList.add('result-wrapper')

        const searchBar = document.querySelector('.search-input')
        const keyword = searchBar.value
        const searchCategory = selectElement.value.toLowerCase()

        const previousResults = document.querySelectorAll('.previous')
        previousResults.forEach(result => result.remove())

        console.log(keyword)
        console.log(searchCategory)

        if (searchCategory === 'posts') {

            await createPostElement(keyword)

        } else {
            console.log('blogai')
        }
    })

    // /posts?q=internet
    // /users?q=al

    // romano koda bandziau

    // function searchResults(searchArr, searchCategory) {
    //     const resultWrapper = document.createElement('div')
    //     resultWrapper.classList.add('result-wrapper')

    //     const searchResultTitle = document.createElement('h2')
    //     searchResultTitle.textContent = 'results found: '

    //     resultWrapper.append(searchResultTitle)

    //     if (searchArr.length === 0) {
    //         searchResultTitle.textContent = `No ${searchCategory}...`
    //         return resultWrapper
    //     }

    //     searchResultTitle.textContent = `${searchCategory} ${searchArr.length}:`

    //     const searchList = document.createElement('ul')
    //     searchList.classList.add('search-list')

    //     resultWrapper.append(searchList)

    //     searchArr.map(item => {
    //         const searchItem = document.createElement('li')
    //         searchItem.classList.add('search-item')

    //         const searchLink = document.createElement('a')
    //         searchLink.classList.add('search-link')
    //         searchLink.text = item.title
    //         searchLink.href = item.path

    //         searchItem.append(searchLink)
    //         searchList.append(searchItem)
    //     })
    //     return resultWrapper
    // }

    // async function renderAllSearchResults(searchWord) {
    //     const allSearchResults = document.createElement('div')
    //     allSearchResults.classList.add('all-search-results')

    //     if (!searchWord) {
    //         console.log('error paieskos fraze')
    //         return
    //     }

    //     const users = await fetchData(`${API_URL}/users?q=${searchWord}`)
    //     const posts = await fetchData(`${API_URL}/posts?q=${searchWord}&_expand=user`)
    //     const albums = await fetchData(`${API_URL}/albums?q=${searchWord}&_expand=user`)
    //     console.log(users)
    //     const usersSearchData = users.map(user => {
    //         // const userData = {
    //         //     title: user.title,
    //         //     path: `./user.html?user_id=` + user.id,
    //         // }

    //         return userData
    //     })
    //     const postsSearchData = posts.map(post => {
    //         const postData = {
    //             title: post.title,
    //             path: `./post.html?post=` + post.id,
    //         }

    //         return postData
    //     })
    //     const albumsSearchData = albums.map(album => {
    //         const albumData = {
    //             title: album.title,
    //             path: `./album.html?album_id=` + album.id,
    //         }

    //         return albumData
    //     })

    //     const searchUsers = searchResults(usersSearchData, 'user')
    //     const searchPosts = searchResults(usersSearchData, 'post')
    //     const searchAlbum = searchResults(usersSearchData, 'album')

    //     allSearchResults.append(searchUsers, postsSearchData, albumsSearchData)

    //     return allSearchResults
    // }
    async function createUserElement(word) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${word}`)
        const userResults = await res.json()

        const usersFound = userResults.length
        const userResultWrapper = document.createElement('div')
        userResultWrapper.classList.add('user-result-wrapper', 'previous')

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
            resultLink.classList.add('result-link')
            resultLink.textContent = firstName
            resultLink.href = `./user.html?user_id=${id}`

            userResult.append(resultLink)
            userResultWrapper.append(userResult)
            resultWrapper.append(userResultWrapper)
        })
    }
    await createUserElement(searchWord)

    async function createPostElement(word) {

        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${word}&_expand=user`)
        const resultsPosts = await resPost.json()

        const postsFound = resultsPosts.length
        const postResultWrapper = document.createElement('div')
        postResultWrapper.classList.add('post-result-wrapper', 'previous')
        const postResultTitle = document.createElement('h3')
        postResultTitle.classList.add('post-result-title')
        postResultTitle.textContent = `${postsFound} Posts found with keyword '${word}': `

        console.log(resultsPosts)

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

            postResultWrapper.append(postList)
            resultWrapper.append(postResultWrapper)
        })
    }
    await createPostElement(searchWord)

    async function createAlbumElement(word) {

        const resAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums?q=${word}&_expand=user`)
        const resultsAlbums = await resAlbum.json()

        const albumsFound = resultsAlbums.length
        const albumsResultWrapper = document.createElement('div')
        albumsResultWrapper.classList.add('albums-result-wrapper', 'previous')
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
            resultLink.classList.add('result-link')
            resultLink.textContent = firstLetterUpperCase(title)
            resultLink.href = `./album.html?album_id=${id}`

            const albumItemDescription = document.createElement('span')
            albumItemDescription.classList.add('album-item-description')
            albumItemDescription.textContent = `. Made by: `

            const albumItemDescriptionLink = document.createElement('a')
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
