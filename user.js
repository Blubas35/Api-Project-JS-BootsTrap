const pageContent = document.querySelector('#page-content')

async function renderUser() {
    
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
    userInfoElement.classList.add('user-wrapper')

    const userNameElement = document.createElement('p')
    userNameElement.classList.add('user-name')
    userNameElement.textContent = `Full name: ${name}`

    const userNickNameElement = document.createElement('p')
    userNickNameElement.classList.add('nick-name')
    userNickNameElement.textContent = `Username: ${username}`

    const userEmailElement = document.createElement('p')
    userEmailElement.classList.add('user-email')
    userEmailElement.textContent = `Email address: ${email}`

    const userAddressElement = document.createElement('p')
    userAddressElement.classList.add('user-address')

    const addressSpanElement = document.createElement('span')
    addressSpanElement.classList.add('span-element')
    addressSpanElement.textContent = 'Address: '

    const userAddressMapElement = document.createElement('a')
    userAddressMapElement.classList.add('user-address-link')
    userAddressMapElement.textContent = `${street}, ${suite}, ${city}, ${zipcode}`

    userAddressMapElement.setAttribute('target', '_blank')
    userAddressMapElement.href = `https://www.google.com/maps/place/${lat},${lng}`

    const userPhoneElement = document.createElement('p')
    userPhoneElement.classList.add('user-phone')
    userPhoneElement.textContent = `Phone number: ${phone}`

    const spanElement = document.createElement('span')
    spanElement.textContent = `Website: `
    const userWebsiteElement = document.createElement('a')
    userWebsiteElement.classList.add('user-website')
    userWebsiteElement.textContent = `${website}`
    userWebsiteElement.href = '#'

    const userCompanyNameElement = document.createElement('p')
    userCompanyNameElement.classList.add('user-company-name')
    userCompanyNameElement.textContent = `Company name: ${companyName}`

    userInfoElement.append(userNameElement, userNickNameElement, userEmailElement, userAddressElement, addressSpanElement, userAddressMapElement, userPhoneElement, spanElement, userWebsiteElement, userCompanyNameElement)

    pageContent.append(userInfoElement)
    const userPostWrapper = document.createElement('div')
    userPostWrapper.classList.add('user-post-wrapper')

    const userPostListTitle = document.createElement('h2')
    userPostListTitle.classList.add('post-list-title')
    userPostListTitle.textContent = 'User Posts'

    const userPostList = document.createElement('ul')
    userPostList.classList.add('user-post-list')

    posts.map(post => {
        let { title} = post

        const userPostTitle = document.createElement('li')
        userPostTitle.classList.add('user-post-title')

        const userPostLink = document.createElement('a')
        userPostLink.classList.add('user-post-link')
        userPostLink.textContent = `${title}`
        userPostLink.href = `./post.html?post_id=${post.id}`

        userPostTitle.append(userPostLink)
        userPostList.append(userPostTitle)
        userPostWrapper.append(userPostListTitle, userPostList)
        pageContent.append(userPostWrapper)
    })

    const userAlbumWrapper = document.createElement('div')
    userAlbumWrapper.classList.add('user-album-wrapper')

    const userAlbumListTitle = document.createElement('h2')
    userAlbumListTitle.classList.add('post-list-title')
    userAlbumListTitle.textContent = 'User Albums'

    const userAlbumList = document.createElement('ul')
    userPostList.classList.add('user-post-list')

    albums.map(album => {
        const userAlbumTitle = document.createElement('li')
        userAlbumTitle.classList.add('user-album-title')
        console.log(album)
        const userAlbumLink = document.createElement('a')
        userAlbumLink.classList.add('album-link')
        userAlbumLink.textContent = `${album.title}`
        userAlbumLink.href = `./album.html?album_id=${album.id}`

        userAlbumTitle.append(userAlbumLink)
        userAlbumList.append(userAlbumTitle)
        userAlbumWrapper.append(userAlbumListTitle, userAlbumList)
        pageContent.append(userAlbumWrapper)
    })
    
}
renderUser()
