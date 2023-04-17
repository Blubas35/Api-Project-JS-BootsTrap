import { createPageMainHeader } from "./Components/header.js"
import { firstLetterUpperCase } from "./function.js"
import { createFooter } from "./Components/footer.js";

async function renderUser() {
    const pageContent = document.querySelector('#page-content')
    pageContent.classList.add('px-6', 'px-4')
    pageContent.before(createPageMainHeader())

    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const id = urlParams.get('user_id')

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts&_embed=albums`)
    const users = await res.json()

    let { name, username, email, phone, website, posts, albums } = users
    let { city, street, suite, zipcode } = users.address
    let { lat, lng } = users.address.geo
    let companyName = users.company.name

    const userInfoElement = document.createElement('div')
    userInfoElement.classList.add('user-wrapper', 'shadow-sm', 'col-xl-8', 'col-lg-9', 'col-md-10', 'p-4', 'mb-5', 'bg-body-tertiary', 'rounded',)

    const rowElement = document.createElement('div')
    rowElement.classList.add('row', 'row-gap-3')

    const userInfoTitle = document.createElement('h2')
    userInfoTitle.classList.add('user-info-title', 'col-12')
    userInfoTitle.textContent = `Users ${name} (Id: ${id}) information:`
    userInfoTitle.innerHTML = `Users <span class="user-info-name">${name} (Id: ${id})</span> information:`;

    const userNameWrapper = document.createElement('div')
    userNameWrapper.classList.add('user-name-wrapper')

    const userNameElement = document.createElement('span')
    userNameElement.classList.add('user-name', 'first', 'col-12')
    userNameElement.textContent = `Full name: `

    const userNameElement2 = document.createElement('span')
    userNameElement2.classList.add('user-name2')
    userNameElement2.textContent = name
    userNameWrapper.append(userNameElement, userNameElement2)

    const userNickNameWrapper = document.createElement('div')
    userNickNameWrapper.classList.add('user-nickName-wrapper', 'col-12')

    const userNickNameElement = document.createElement('span')
    userNickNameElement.classList.add('nick-name', 'first')
    userNickNameElement.textContent = `Username: `

    const userNickNameElement2 = document.createElement('span')
    userNickNameElement2.classList.add('nick-name2')
    userNickNameElement2.textContent = `${username}`
    userNickNameWrapper.append(userNickNameElement, userNickNameElement2)

    const userEmailWrapper = document.createElement('div')
    userEmailWrapper.classList.add('user-email-wrapper', 'col-12')

    const userEmailElement = document.createElement('span')
    userEmailElement.classList.add('user-email', 'first')
    userEmailElement.textContent = `Email address: `

    const emailLink = document.createElement('a')
    emailLink.classList.add('email-link', 'post-author-link')
    emailLink.textContent = email
    emailLink.href = `mailto:${email}`

    userEmailWrapper.append(userEmailElement, emailLink)

    const addressWrapper = document.createElement('div')
    addressWrapper.classList.add('address-wrapper', 'col-12')

    const addressSpanElement = document.createElement('span')
    addressSpanElement.classList.add('span-element', 'first')
    addressSpanElement.textContent = 'Address: '

    const userAddressMapElement = document.createElement('a')
    userAddressMapElement.classList.add('user-address-link', 'post-author-link')
    userAddressMapElement.textContent = `${street}, ${suite}, ${city}, ${zipcode}`
    userAddressMapElement.setAttribute('target', '_blank')
    userAddressMapElement.href = `https://www.google.com/maps/place/${lat},${lng}`

    addressWrapper.append(addressSpanElement, userAddressMapElement)

    const userPhoneWrapper = document.createElement('div')
    userPhoneWrapper.classList.add('user-phone-wrapper', 'col-12')

    const userPhoneElement = document.createElement('span')
    userPhoneElement.classList.add('user-phone', 'first')
    userPhoneElement.textContent = `Phone number: `

    const userPhone = document.createElement('a')
    userPhone.classList.add('user-phone', 'post-author-link')
    userPhone.textContent = phone
    userPhone.href = `tel:${phone}`

    userPhoneWrapper.append(userPhoneElement, userPhone)

    const websiteWrapper = document.createElement('div')
    websiteWrapper.classList.add('website-wrapper', 'col-12')

    const spanElement = document.createElement('span')
    spanElement.classList.add('website', 'first')
    spanElement.textContent = `Website: `
    const userWebsiteElement = document.createElement('a')
    userWebsiteElement.classList.add('user-website', 'col-12', 'post-author-link')
    userWebsiteElement.textContent = `${website}`
    userWebsiteElement.href = '#'

    websiteWrapper.append(spanElement, userWebsiteElement)

    const companyNameWrapper = document.createElement('div')
    companyNameWrapper.classList.add('company-name-wrapper')

    const userCompanyNameElement = document.createElement('span')
    userCompanyNameElement.classList.add('user-company-name', 'first')
    userCompanyNameElement.textContent = `Company name: `

    const userCompanyNameElement2 = document.createElement('span')
    userCompanyNameElement2.classList.add('user-company-name')
    userCompanyNameElement2.textContent = `${companyName}`
    companyNameWrapper.append(userCompanyNameElement, userCompanyNameElement2)

    rowElement.append(userInfoTitle, userNameWrapper, userNickNameWrapper, userEmailWrapper, addressWrapper, userPhoneWrapper, websiteWrapper, companyNameWrapper)

    userInfoElement.append(rowElement)

    pageContent.append(userInfoElement)
    const userPostWrapper = document.createElement('div')
    userPostWrapper.classList.add('user-post-wrapper', 'shadow-sm', 'col-xl-8', 'col-lg-9', 'col-md-10', 'p-4', 'mb-5', 'bg-body-tertiary', 'rounded')

    const userPostTitleWrapper = document.createElement('div');
    userPostTitleWrapper.classList.add('user-post-title-wrapper');

    const userPostListTitle = document.createElement('h2');
    userPostListTitle.classList.add('post-list-title');
    userPostListTitle.innerHTML = `<span class="italic">${name}</span> Posts:`;

    userPostTitleWrapper.append(userPostListTitle);

    const userPostList = document.createElement('ul')
    userPostList.classList.add('user-post-list', 'list-unstyled', 'd-flex', 'flex-column', 'row-gap-2')

    posts.map(post => {
        let { title } = post

        const userPostTitle = document.createElement('li')
        userPostTitle.classList.add('user-post-title')

        const userPostLink = document.createElement('a')
        userPostLink.classList.add('user-post-link', 'post-author-link')
        userPostLink.textContent = `${firstLetterUpperCase(title)}`
        userPostLink.href = `./post.html?post_id=${post.id}`

        userPostTitle.append(userPostLink)
        userPostList.append(userPostTitle)
        userPostWrapper.append(userPostTitleWrapper, userPostList)
        pageContent.append(userPostWrapper)
        const screenWidth = window.innerWidth;
        if (screenWidth < 450) {
            addClassResponsive('.user-wrapper')
        }
    })

    const userAlbumWrapper = document.createElement('div')
    userAlbumWrapper.classList.add('user-album-wrapper', 'shadow-sm', 'col-xl-8', 'col-lg-9', 'col-md-10', 'p-4', 'mb-5', 'bg-body-tertiary', 'rounded')

    const userAlbumListWrapper = document.createElement('div');
    userAlbumListWrapper.classList.add('album-list-title-wrapper');

    const userAlbumListTitle = document.createElement('h2');
    userAlbumListTitle.classList.add('album-list-title');
    userAlbumListTitle.innerHTML = `<span class="italic">${name}</span> Albums:`;
    userAlbumListWrapper.append(userAlbumListTitle);

    const userAlbumList = document.createElement('ul')
    userAlbumList.classList.add('user-album-list', 'list-unstyled', 'd-flex', 'flex-column', 'row-gap-2')

    albums.map(album => {
        const userAlbumTitle = document.createElement('li')
        userAlbumTitle.classList.add('user-album-title')

        const userAlbumLink = document.createElement('a')
        userAlbumLink.classList.add('album-link', 'post-author-link')
        userAlbumLink.textContent = `${firstLetterUpperCase(album.title)}`
        userAlbumLink.href = `./album.html?album_id=${album.id}`

        userAlbumTitle.append(userAlbumLink)
        userAlbumList.append(userAlbumTitle)
        userAlbumWrapper.append(userAlbumListTitle, userAlbumList)
        pageContent.append(userAlbumWrapper)
    })
    pageContent.after(createFooter())
}
renderUser()
