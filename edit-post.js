import { fetchData, getParams, firstLetterUpperCase } from "./function.js"
import { API_URL } from "./config.js"
import { createPageMainHeader } from "./header.js"

async function init() {
    const createPostForm = document.querySelector('#create-post-form')
    const userSelectElement = createPostForm.user
    const titleElement = createPostForm.title
    const bodyElement = createPostForm.body
    const submitButton = createPostForm.submit

    createPostForm.before(createPageMainHeader())

    const users = await fetchData(`${API_URL}/users`)

    users.map(user => {
        const userOptionElement = document.createElement('option')
        userOptionElement.textContent = user.name
        userOptionElement.value = user.id

        userSelectElement.append(userOptionElement)
    })

    userSelectElement.disabled = true;

    submitButton.removeAttribute('disabled')

    const postId = getParams('post_id')
    const postToEdit = await fetchData(`${API_URL}/posts/${postId}`)

    console.log(postToEdit)

    userSelectElement.value = postToEdit.userId
    titleElement.value = firstLetterUpperCase(postToEdit.title)
    bodyElement.value = firstLetterUpperCase(postToEdit.body)

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        const userId = Number(event.target.user.value)

        const editPostData = {
            id: postId,
            title,
            body,
            userId
        }

        const newPost = await fetchData(`${API_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(editPostData),
        })

        const previousPostItem = document.querySelector('.post-item')
        if (previousPostItem) {
            previousPostItem.remove()
        }

        createPostForm.after(await createNewPostElement(newPost))

    })

}
async function createNewPostElement(postData) {
    let { body, title, id, userId } = postData
    const user = await fetchData(`${API_URL}/users/${userId}`)

    const postItem = document.createElement('div')
    postItem.classList.add('post-item', 'mx-auto', 'my-5', 'shadow-sm', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')

    postItem.innerHTML = `
    <a class="post-link-title order-2 fs-4 text-decoration-none text-dark fw-bolder" href="./post.html?post_id=${id}"> 
    ${title} (id: ${id})
    </a>
    <span class="post-author order-1 text-secondary">
    Author: 
    <a class="post-author-link text-secondary" href="./user.html?user_id=${userId}">
    ${user.name}</a>
    </span>
    <p class="post-body order-3 fs-5 fw-lighter">${body}</p>`

    return postItem
}

init()