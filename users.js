import { createPageMainHeader } from "./Components/header.js";
import { createFooter } from "./Components/footer.js";

async function init() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
    const users = await res.json()

    const photoRes = await fetch(`https://randomuser.me/api/?inc=picture&results=10`)
    const photos = await photoRes.json()
    const photosArr = photos.results

    const pageContent = document.querySelector('#page-content')
    const usersList = createListElement(users, photosArr)
    const usersListTitle = document.createElement('h2')
    usersListTitle.classList.add('users-list-title')
    usersListTitle.textContent = 'User information list'
    const pageWrapper = document.createElement('div')
    pageWrapper.classList.add('wrapper')
    const categoriesUsersWrapper = document.createElement('div')
    categoriesUsersWrapper.classList.add('categories-wrapper', 'mb-5')

    const categories = ['Photo', 'Name', 'Email', 'Phone', 'Website']
    const categoriesList = createCategoriesList(categories)
    usersList.prepend(categoriesList)
    categoriesUsersWrapper.append(usersListTitle, usersList)
    pageWrapper.append(categoriesUsersWrapper)
    pageContent.append(pageWrapper)
    // pageContent.append(usersListTitle, usersList)
    pageContent.before(createPageMainHeader());
    pageContent.after(createFooter())
}

function createListElement(users, photosArr) {
    const usersListWrapper = document.createElement('div')
    usersListWrapper.classList.add('users-list-wrapper')

    const usersList = document.createElement('ul')
    usersList.classList.add('users-list', 'data-list')

    users.forEach((user, index) => {
        let { email, phone, website } = user

        const userPhotoLink = document.createElement('a')
        userPhotoLink.classList.add('user-photo-link')
        userPhotoLink.href = `./user.html?user_id=${user.id}`
        const userPhotoElement = document.createElement('img')
        userPhotoElement.classList.add('user-photo')
        userPhotoElement.setAttribute('alt', 'user profile picture')

        const photo = photosArr[index]
        const profilePic = photo.picture.thumbnail

        userPhotoElement.src = profilePic

        const postCount = user.posts.length
        const userName = user.name
        const userItem = document.createElement('li')
        userItem.classList.add('user-item')
        // userItem.classList.add('user-item', 'd-flex', 'justify-content-between')
        const userLink = document.createElement('a')
        userLink.href = `./user.html?user_id=${user.id}`
        userLink.textContent = `${userName}`
        userLink.classList.add('user-name')
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

        userPhotoLink.append(userPhotoElement)
        userItem.append(userPhotoLink, userLink, emailElement, phoneElement, websiteElement)
        usersList.append(userItem)
        usersListWrapper.append(usersList)
    })


    return usersListWrapper
}

function createCategoriesList(categories) {
    const categoriesWrapper = document.createElement('div')
    categoriesWrapper.classList.add('categories-wrapper')
    const userListCategories = document.createElement('ul')
    userListCategories.classList.add('user-list-categories')

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

