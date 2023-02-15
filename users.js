// async function countPost(id) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
//     const posts = await res.json()
//     return posts.length
// }

async function init() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
    const users = await res.json()
   
    const header = createPageMainHeader();

    const pageContent = document.querySelector('#page-content')
    const usersList = createListElement(users)
    pageContent.append(usersList)
    pageContent.before(header);
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
        userLink.href = `./user.html?id=${user.id}`
        userLink.textContent = `${userName} (${postCount})`

        userItem.append(userLink)
        usersList.append(userItem)
    })
    return usersList
}

function createPageMainHeader() {
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    nav.classList.add('main-navigation');
    const menuList = document.createElement('ul');
    menuList.classList.add('menu');
  
    const menuItems = [
      {
        title: 'Home',
        path: 'index.html',
      },
      {
        title: 'Posts',
        path: 'posts.html',
      },
      {
        title: 'Users',
        path: 'users.html',
      },
      {
        title: 'Albums',
        path: 'albums.html',
      },
    ];
  
    menuItems.forEach(menuItem => {
      // let title = menuItem.title;
      // let path = menuItem.path;
      let { title, path } = menuItem;
  
      const menuItemElement = document.createElement('li');
      menuItemElement.classList.add('menu-item');
  
      if (location.pathname === '/' + path) {
        menuItemElement.classList.add('active');
      }
  
      const menuLink = document.createElement('a');
      menuLink.textContent = title;
      menuLink.href = './' + path;
  
      menuItemElement.append(menuLink);
      menuList.append(menuItemElement);
    })
  
    nav.append(menuList);
    header.append(nav);
    return header;
  }

init()

// async function getUsers() {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
//     const users = await res.json()

//     const pageContent = document.querySelector('#page-content')
//     const usersList = document.createElement('ul')
//     usersList.classList.add('users-list', 'data-list')
//     pageContent.append(usersList)

//     // romano versija
//     users.map(async user => {

//         const postCount = user.posts.length
//         const userName = user.name
//         const userItem = document.createElement('li')
//         userItem.classList.add('user-item')
//         const userLink = document.createElement('a')
//         userLink.href = `./user.html?id=${user.id}`
//         userLink.textContent = `${userName} (${postCount})`
//         userItem.append(userLink)

//         usersList.append(userItem)
//     })
// }
    // users.map(async user => {
    //     const userName = user.name
    //     const postCount = await countPost(user.id)
    //     const userItem = document.createElement('li')
    //     userItem.classList.add('user-item')

    //     userItem.className = 'user-item'
    //     userItem.innerHTML = `<a href="./users.html">${userName} (${postCount}post)</a>`

    //     usersList.append(userItem)
    // })


// getUsers()

