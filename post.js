import { createPageMainHeader } from "./Components/header.js"
import { createFooter } from "./Components/footer.js";
import { displayPostMsg } from "./Components/displayMsg.js"
import { fetchData, firstLetterUpperCase } from "./function.js"
import { API_URL } from "./config.js"

async function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.classList.add('px-6', 'px-4')
    pageContent.before(createPageMainHeader())
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('post_id')

    const posts = await fetchData(`${API_URL}/posts/${id}?_expand=user&_embed=comments`)
    
    let { title, body, comments, userId} = posts

    const postsWrapper = document.createElement('div')
    postsWrapper.classList.add('posts-Wrapper', 'd-flex', 'flex-column', 'shadow-sm', 'col-xl-9', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')

    const postsTitle = document.createElement('h2')
    postsTitle.classList.add('posts-title', 'order-2', 'fs-1', 'text-dark', 'fw-bolder')
    postsTitle.textContent = firstLetterUpperCase(title)

    const postsAuthor = document.createElement('div')
    postsAuthor.classList.add('posts-author', 'order-1', 'fs-6')

    const postAuthorLink = document.createElement('a')
    postAuthorLink.classList.add('post-author-link', 'text-secondary')
    postAuthorLink.textContent = `${posts.user.name}`
    postAuthorLink.href = `./user.html?user_id=${userId}`
    const spanElement = document.createElement('span')
    spanElement.textContent ='Posted by: '
    spanElement.classList.add('text-secondary')

    const postBody = document.createElement('p')
    postBody.classList.add('post-body', 'order-3', 'fs-4')
    postBody.textContent = firstLetterUpperCase(body)

    const editButtonWrapper = document.createElement('div')
    editButtonWrapper.classList.add('button-wrapper', 'order-4')

    const postEditLink = document.createElement('a')
    postEditLink.textContent = 'Edit Post'
    postEditLink.href = `./edit-post.html?post_id=${id}`
    postEditLink.classList.add('btn', 'btn-primary')

    editButtonWrapper.append(postEditLink)
    postsAuthor.append(spanElement, postAuthorLink)

    const commentsWrapper = document.createElement('div')
    commentsWrapper.classList.add('comments-wrapper')

    const commentsTitle = document.createElement('h2')
    commentsTitle.classList.add('comments-title', 'ps-4')
    commentsTitle.textContent = 'Comments'

    const commentsList = document.createElement('ul')
    commentsList.classList.add('comments-list')

    comments.map(comment => {

        let { body, email, id } = comment

        const commentItem = document.createElement('li')
        commentItem.classList.add('comment-item', 'shadow-sm', 'col-xl-6', 'col-lg-7', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'd-flex', 'flex-column', 'gap-1')

        const commentBody = document.createElement('p')
        commentBody.classList.add('comment-body')
        commentBody.textContent = firstLetterUpperCase(body)

        const authorWrapperElement = document.createElement('div')
        authorWrapperElement.classList.add('author-wrapper', 'd-flex', 'flex-column', 'gap-3')

        const commentAuthorWrapper = document.createElement('div')
        commentAuthorWrapper.classList.add('comment-author-wrapper')

        const spanElement = document.createElement('span')
        spanElement.classList.add('span-element')
        spanElement.textContent ='Written by: '

        const commentEmail = document.createElement('a')
        commentEmail.classList.add('comment-email', 'post-author-link')
        commentEmail.textContent = `${email}`
        commentEmail.href = `mailto:${email}`

        const buttonWrapper = document.createElement('div')
        buttonWrapper.classList.add('button-wrapper')
        const removeButton = document.createElement('button')
        removeButton.classList.add('remove-button', 'btn', 'btn-primary')
        removeButton.textContent = 'Remove'

        buttonWrapper.append(removeButton)
        commentAuthorWrapper.append(spanElement, commentEmail)
        authorWrapperElement.append(commentAuthorWrapper, buttonWrapper)

        removeButton.addEventListener('click', ()=> {
            fetchData(`${API_URL}/comments/${id}`, {
                method: 'DELETE'
            })
            commentItem.after(displayPostMsg('deleted'))
        })

        commentItem.append(commentBody, authorWrapperElement)
        commentsList.append(commentItem)
        commentsWrapper.append(commentsTitle, commentsList)
    })

    const otherPostsElement = document.createElement('div')
    otherPostsElement.classList.add('other-user-posts', 'fs-6')
    
    const otherPosts = document.createElement('a')
    otherPosts.classList.add('post-author-link', 'text-secondary')
    otherPosts.textContent = `${posts.user.name}`
    otherPosts.href = `posts.html`

    const otherPostsSpan = document.createElement('span')
    otherPostsSpan.classList.add('other-posts-by', 'text-dark')
    otherPostsSpan.textContent = 'Other posts by: '
    otherPostsElement.append(otherPostsSpan, otherPosts)
    
    postsWrapper.append(postsTitle, postsAuthor, postBody, editButtonWrapper)
    pageContent.append(postsWrapper, commentsWrapper, otherPostsElement)
    pageContent.after(createFooter())
}
init()