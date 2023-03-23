import { fetchData, getParams } from "./function.js"
import { API_URL } from "./config.js"

async function init() {
    const createPostForm = document.querySelector('#create-post-form')
    const userSelectElement = createPostForm.user
    const titleElement = createPostForm.title
    const bodyElement = createPostForm.body
    const submitButton = createPostForm.submit


    const users = await fetchData(`${API_URL}/users`)

    users.map(user => {
        console.log(user.name)
        console.log(user.id)

        const userOptionElement = document.createElement('option')
        userOptionElement.textContent = user.name
        userOptionElement.value = user.id

        userSelectElement.append(userOptionElement)
    })

    submitButton.removeAttribute('disabled')

    const postId = getParams('post_id')
    const postToEdit = await fetchData(`${API_URL}/posts/${postId}`)

    userSelectElement.value = postToEdit.userId
    titleElement.value = postToEdit.title
    bodyElement.value = postToEdit.body

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        const userId = Number(event.target.user.value)
        
        const editPostData = {
            // title: title,
            // boyd: body,
            // userId: user
            // galima ir tiap rasyti kad nereiketu po du kartus
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
    postItem.classList.add('post-item')

    postItem.innerHTML = `<h2 class="post-title"> ${title} (id: ${id})</h2>
    <span class="post-author">Author: ${user.name}</span>
    <p class="post-body">${body}</p>        `

    return postItem
}

init()