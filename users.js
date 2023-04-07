import { createPageMainHeader } from "./header.js";

async function init() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
    const users = await res.json()

    const pageContent = document.querySelector('#page-content')
    const usersList = createListElement(users)
    const usersListTitle = document.createElement('h2')
    usersListTitle.classList.add('users-list-title')
    usersListTitle.textContent = 'Featured users list'

    const categories = ['Photo', 'Name', 'Email', 'Phone', 'Website']
    const categoriesList = createCategoriesList(categories)
    usersList.prepend(categoriesList)
    pageContent.append(usersListTitle, usersList)
    pageContent.before(createPageMainHeader());
    console.log(users)
}

function createListElement(users) {
    const usersListWrapper = document.createElement('div')
    usersListWrapper.classList.add('users-list-wrapper')

    users.forEach(user => {

        let {email, phone, website} = user

        const usersList = document.createElement('ul')
        usersList.classList.add('users-list', 'data-list')
        const postCount = user.posts.length
        const userName = user.name
        const userItem = document.createElement('li')
        userItem.classList.add('user-item', 'd-flex', 'justify-content-between')
        const userPhotoElement = document.createElement('img')
        userPhotoElement.classList.add('user-photo')
        const userLink = document.createElement('a')
        userLink.href = `./user.html?user_id=${user.id}`
        userLink.textContent = `${userName}`
        // const postSpanElement = document.createElement('span')
        // postSpanElement.textContent = ` (Post count: ${postCount})`
        const emailElement = document.createElement('a')
        emailElement.classList.add('email-address')
        emailElement.href = `mailto:${email}`
        emailElement.textContent = `${email}`
        const phoneElement = document.createElement('a')
        phoneElement.classList.add('phone-element')
        phoneElement.href = `tel:${phone}`
        phoneElement.textContent = `${phone}`
        const websiteElement = document.createElement('a')
        websiteElement.classList.add('website-element')
        websiteElement.href = `${website}`
        websiteElement.textContent = `${website}`

        userItem.append(userPhotoElement, userLink, emailElement, phoneElement, websiteElement)
        usersList.append(userItem)
        usersListWrapper.append(usersList)
    })
    
    return usersListWrapper
}

function createCategoriesList(categories) {
    const categoriesWrapper = document.createElement('div')
    categoriesWrapper.classList.add('categories-wrapper')
    const userListCategories = document.createElement('ul')
    userListCategories.classList.add('user-list-categories', 'd-flex', 'justify-content-between')

    categories.map(category => {
        const listCategories = document.createElement('li')
        listCategories.classList.add('categories-list')
        const categoryTitle = document.createElement('h2')
        categoryTitle.classList.add('category-title')
        categoryTitle.textContent = category

        listCategories.append(categoryTitle)
        userListCategories.append(listCategories)
    })
    // categoriesWrapper.append(userListCategories)
    return userListCategories
}
init()

