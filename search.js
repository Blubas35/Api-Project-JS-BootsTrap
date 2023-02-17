import { createPageMainHeader } from "./header.js";
import { firstLetterUpperCase } from "./function.js";

async function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.before(createPageMainHeader());

    let queryParams = new URLSearchParams(location.search)
    let searchWord = queryParams.get('search')
    console.log(queryParams)
    
    // /posts?q=internet
    // /users?q=al
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchWord}`)
    const userResults = await res.json()

    const resultWrapper = document.createElement('div')
    resultWrapper.classList.add('result-wrapper')
    
    const usersFound = userResults.length
    const userResultWrapper = document.createElement('div')
    userResultWrapper.classList.add('user-result')

    const userResultTitle = document.createElement('h3')
    userResultTitle.classList.add('user-result-title')
    userResultTitle.textContent = `${usersFound} Users found with keyword '${searchWord}': `

    userResultWrapper.prepend(userResultTitle)
    
    console.log(userResults)
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


    const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchWord}&_expand=user`)
    const resultsPosts = await resPost.json()

    const postsFound = resultsPosts.length
    const postResultWrapper = document.createElement('div')
    postResultWrapper.classList.add('post-result-wrapper')
    const postResultTitle = document.createElement('h3')
    postResultTitle.classList.add('post-result-title')
    postResultTitle.textContent = `${postsFound} Posts found with keyword '${searchWord}': `

    console.log(resultsPosts)
    
    postResultWrapper.prepend(postResultTitle)

    resultsPosts.forEach(post => {
        const id = post.id
        const title = post.title
        
        const postList = document.createElement('ul')
        postList.classList.add('post-list')
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
        postItemDescriptionLink.href = `./user.html?user_id=${id}`

        postItem.append(resultLink, postItemDescription, postItemDescriptionLink)
        postList.append(postItem)

        postResultWrapper.append(postList)
        resultWrapper.append(postResultWrapper)
    })
    
    const resAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums?q=${searchWord}&_expand=user`)
    const resultsAlbums = await resAlbum.json()

    const albumsFound = resultsAlbums.length
    const albumsResultWrapper = document.createElement('div')
    postResultWrapper.classList.add('post-result-wrapper')
    const albumsResultTitle = document.createElement('h3')
    albumsResultTitle.classList.add('post-result-title')
    albumsResultTitle.textContent = `${albumsFound} Albums found with keyword '${searchWord}': `

    albumsResultWrapper.prepend(albumsResultTitle)

    resultsAlbums.forEach(album => {
        console.log(album)
        const id = album.id
        const name = album.user.name
        const title = album.title

        const albumList = document.createElement('ul')
        albumList.classList.add('album-list')
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
        albumItemDescriptionLink.href = `./user.html?user_id=${id}`

        albumItem.append(resultLink, albumItemDescription, albumItemDescriptionLink)
        albumList.append(albumItem)

        albumsResultWrapper.append(albumList)
        resultWrapper.append(albumsResultWrapper)
    })

    pageContent.append(resultWrapper)

    if (usersFound === 0 && postsFound === 0 && albumsFound === 0) {
        const errorMessageWrapper = document.createElement('div')
        errorMessageWrapper.classList.add('error-message-wrapper')
        const errorMessage = document.createElement('h3')
        errorMessage.classList.add('error-message')
        errorMessage.textContent = `0 results found with keyword '${searchWord}'`

        errorMessageWrapper.append(errorMessage)
        pageContent.append(errorMessageWrapper)
    }
    
}
init()