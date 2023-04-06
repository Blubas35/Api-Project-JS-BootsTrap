import { createPageMainHeader } from "./header.js"
import { fetchData, firstLetterUpperCase } from "./function.js"
import { API_URL } from "./config.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.before(createPageMainHeader())
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('post_id')

    const posts = await fetchData(`${API_URL}/posts/${id}?_expand=user&_embed=comments`)
    
    let { title, body, comments, userId} = posts

    const postsWrapper = document.createElement('div')
    postsWrapper.classList.add('posts-Wrapper', 'row')

    const postsTitle = document.createElement('h2')
    postsTitle.classList.add('posts-title', 'order-2')
    postsTitle.textContent = firstLetterUpperCase(title)

    const postsAuthor = document.createElement('h3')
    postsAuthor.classList.add('posts-author', 'order-1', 'fs-6')

    const postAuthorLink = document.createElement('a')
    postAuthorLink.classList.add('post-author-link', 'text-secondary', 'text-decoration-none')
    postAuthorLink.textContent = `${posts.user.name}`
    postAuthorLink.href = `./user.html?user_id=${userId}`
    const spanElement = document.createElement('span')
    spanElement.textContent ='Posted by: '
    spanElement.classList.add('text-secondary')

    const postBody = document.createElement('p')
    postBody.classList.add('post-body', 'order-3')
    postBody.textContent = firstLetterUpperCase(body)

    const postEditLink = document.createElement('a')
    postEditLink.textContent = 'Edit Post'
    postEditLink.href = `./edit-post.html?post_id=${id}`
    postEditLink.classList.add('order-4')


    postsAuthor.append(spanElement, postAuthorLink)

    const commentsWrapper = document.createElement('div')
    commentsWrapper.classList.add('comments-wrapper')

    const commentsTitle = document.createElement('h2')
    commentsTitle.classList.add('comments-title')
    commentsTitle.textContent = 'Comments'

    const commentsList = document.createElement('ul')
    commentsList.classList.add('comments-list')

    comments.map(comment => {

        let { body, email, name, id } = comment

        const commentItem = document.createElement('li')
        commentItem.classList.add('comment-item')

        const commentTitle = document.createElement('h3')
        commentTitle.classList.add('comment-title')
        commentTitle.textContent = firstLetterUpperCase(name)

        const commentBody = document.createElement('p')
        commentBody.classList.add('comment-body')
        commentBody.textContent = firstLetterUpperCase(body)

        const authorWrapperElement = document.createElement('div')
        authorWrapperElement.classList.add('author-wrapper')

        const spanElement = document.createElement('span')
        spanElement.classList.add('span-element')
        spanElement.textContent ='Written by: '

        const commentEmail = document.createElement('a')
        commentEmail.classList.add('comment-email')
        commentEmail.textContent = `${email}`
        commentEmail.href = '#'

        const removeButton = document.createElement('button')
        removeButton.classList.add('remove-button')
        removeButton.textContent = 'Remove'

        authorWrapperElement.append(spanElement, commentEmail, removeButton)

        removeButton.addEventListener('click', ()=> {
            fetchData(`${API_URL}/comments/${id}`, {
                method: 'DELETE'
            })
        })

        commentItem.append(commentTitle, commentBody, authorWrapperElement)
        commentsList.append(commentItem)
        commentsWrapper.append(commentsTitle, commentsList)
    })

    const otherPostsElement = document.createElement('div')
    otherPostsElement.classList.add('other-user-posts')
    
    const otherPosts = document.createElement('a')
    otherPosts.classList.add('other-posts')
    otherPosts.textContent = `Other posts by: ${posts.user.name}`
    otherPosts.href = `posts.html`
    
    otherPostsElement.append(otherPosts)
    
    postsWrapper.append(postsTitle, postsAuthor, postBody, postEditLink)
    pageContent.append(postsWrapper, commentsWrapper, otherPostsElement)
}
init()