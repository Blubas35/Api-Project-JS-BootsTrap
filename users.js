import { createPageMainHeader } from "./header.js";

async function init() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
    const users = await res.json()

    const pageContent = document.querySelector('#page-content')
    const usersList = createListElement(users)
    pageContent.append(usersList)
    pageContent.before(createPageMainHeader());
}

function createListElement (users) {
    const usersList = document.createElement('ul')
    usersList.classList.add('users-list', 'data-list')

    users.forEach(user => {
        const postCount = user.posts.length
        const userName = user.name
        const userItem = document.createElement('li')
        userItem.classList.add('user-item')
        const userLink = document.createElement('a')
        userLink.href = `./user.html?user_id=${user.id}`
        userLink.textContent = `${userName} (${postCount})`

        userItem.append(userLink)
        usersList.append(userItem)
    })
    return usersList
}

init()

