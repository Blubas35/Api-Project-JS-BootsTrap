import { fetchData, deletePreviousElement } from "./function.js"
import { API_URL } from "./config.js"
import { createPageMainHeader } from "./header.js"

async function init() {
    const createPostForm = document.querySelector('#create-post-form')
    const userSelectElement = createPostForm.user
    const submitButton = createPostForm.submit
    const titleElement = createPostForm.querySelector('input[name="title"]')
    const bodyElement = createPostForm.querySelector('textarea[name="body"]')

    createPostForm.before(createPageMainHeader())

    const users = await fetchData(`${API_URL}/users`)

    users.map(user => {

        const userOptionElement = document.createElement('option')
        userOptionElement.textContent = user.name
        userOptionElement.value = user.id

        userSelectElement.append(userOptionElement)
    })

    submitButton.removeAttribute('disabled')

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        const userId = Number(event.target.user.value)

        deletePreviousElement('.error-message')

        if (!title || !body) {
            const errorMessage = document.createElement('p')
            errorMessage.textContent = 'Please fill all inputs before submitting.'
            errorMessage.classList.add('error-message')
            titleElement.classList.add('border', 'border-danger')
            bodyElement.classList.add('border', 'border-danger')
            createPostForm.prepend(errorMessage)
            return
        } else {
            titleElement.classList.remove('border', 'border-danger');
            bodyElement.classList.remove('border', 'border-danger');
        }

        const createdUserData = {
            title,
            body,
            userId
        }

        const newPost = await fetchData(`${API_URL}/posts?_expand=user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(createdUserData),
        })
        const newPostElement = await createNewPostElement(newPost);

        deletePreviousElement('.post-item')

        createPostForm.after(newPostElement)

        event.target.reset()
    })

}
async function createNewPostElement(postData) {
    let { body, title, id, userId } = postData
    const user = await fetchData(`${API_URL}/users/${userId}`)

    const postItem = document.createElement('div')
    postItem.classList.add('post-item', 'mx-auto', 'my-5', 'shadow-sm', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')

    postItem.innerHTML = `    
    <h2 class="post-title order-2 fs-4 text-decoration-none text-dark fw-bolder" href="./post.html?post_id=${id}"> 
    ${title}
    </h2>
    <span class="post-author order-1 text-secondary">
    Author: 
    <a class="post-author-link text-secondary" href="./user.html?user_id=${userId}">
    ${user.name}</a>
    </span>
    <p class="post-body order-3 fs-5 fw-lighter">${body}</p>
    `
    return postItem
}

init()