const pageContent = document.querySelector('#page-content')

async function init() {
    const id = 25
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments`)
    const posts = await res.json()

    let { title, body, comments, userId } = posts

    const postsWrapper = document.createElement('div')
    postsWrapper.classList.add('posts-Wrapper')

    const postsTitle = document.createElement('h2')
    postsTitle.classList.add('posts-title')
    postsTitle.textContent = `${title}`

    const postsAuthor = document.createElement('h3')
    postsAuthor.classList.add('posts-author')

    const postAuthorLink = document.createElement('a')
    postAuthorLink.classList.add('post-author-link')
    postAuthorLink.textContent = `${posts.userId}`
    postAuthorLink.href = `user.html`

    const postBody = document.createElement('p')
    postBody.classList.add('post-body')
    postBody.textContent = `${body}`

    postsAuthor.append(postAuthorLink)

    const commentsWrapper = document.createElement('div')
    commentsWrapper.classList.add('comments-wrapper')

    const commentsTitle = document.createElement('h2')
    commentsTitle.classList.add('comments-title')
    commentsTitle.textContent = 'Comments'

    const commentsList = document.createElement('ul')
    commentsList.classList.add('comments-list')

    comments.map(comment => {

        let { body, email, name } = comment

        const commentItem = document.createElement('li')
        commentItem.classList.add('comment-item')

        const commentTitle = document.createElement('h3')
        commentTitle.classList.add('comment-title')
        commentTitle.textContent = `${name}`

        const commentBody = document.createElement('p')
        commentBody.classList.add('comment-body')
        commentBody.textContent = `${body}`

        const commentEmail = document.createElement('a')
        commentEmail.classList.add('comment-email')
        commentEmail.textContent = `${email}`
        commentEmail.href = '#'

        commentItem.append(commentTitle, commentBody, commentEmail)
        commentsList.append(commentItem)
        commentsWrapper.append(commentsTitle, commentsList)
    })

    const otherPostsElement = document.createElement('div')
    otherPostsElement.classList.add('other-user-posts')
    
    const otherPosts = document.createElement('a')
    otherPosts.classList.add('other-posts')
    otherPosts.textContent = `Other posts by: ${userId}`
    otherPosts.href = `posts.html`
    
    otherPostsElement.append(otherPosts)
    
    postsWrapper.append(postsTitle, postsAuthor, postBody)
    pageContent.append(postsWrapper, commentsWrapper, otherPostsElement)
}
init()