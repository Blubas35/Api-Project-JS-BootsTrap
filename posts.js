// https://jsonplaceholder.typicode.com/users/${userId}?_embed=posts
// https://jsonplaceholder.typicode.com/posts/?_expand=user (jeigu tevini paimti)
// https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15


// async function getComments(id) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
//     const comments = await res.json()
//     return comments.length
// }

// async function getUser(userId) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     const user = await res.json()
//     return user.name
// }


async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user');
    const posts = await res.json();
  
    const pageContent = document.querySelector('#page-content');
    const header = createPageMainHeader();
    const postsList = createPostsListElement(posts);
    pageContent.append(postsList);
    pageContent.before(header);
  }
  
  function createPostsListElement(posts) {
    const postsList = document.createElement('ul');
    postsList.classList.add('posts-list', 'data-list');
  
    posts.map(post => {
      const userName = post.user.name;
      
      const postItem = document.createElement('li');
      postItem.classList.add('post-item');
      
      const postLink = document.createElement('a');
      postLink.textContent = post.title;
      postLink.href = './post.html';
  
      const postAuthor = document.createElement('a');
      postAuthor.textContent = `${userName}`;
      postAuthor.href = './user.html';
  
      postItem.append(postLink, ' - ', postAuthor);
  
      postsList.append(postItem);
    })
  
    return postsList;
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
  
  init();

// async function getPosts() {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments`)
//     const posts = await res.json()

//     const pageContent = document.querySelector('#page-content')

//     const postList = document.createElement('ul')
//     postList.classList.add('post-list')

//     pageContent.append(postList)

//     posts.map(async post => {
//         const postTitle = post.title
//         console.log(post)
//         const postItem = document.createElement('li')
//         postItem.classList.add('post-item')

//         const postLink = document.createElement('a')
//         postLink.textContent = postTitle
//         postLink.href = './post.html'

//         const postAuthor = document.createElement('a')
//         postAuthor.textContent = `(${post.user.name})`
//         postAuthor.href = './user.html'

//         postItem.append(postLink, ' ', postAuthor)

//         postList.append(postItem)

//     })

    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    // const posts = await res.json()

    // const pageContent = document.querySelector('#page-content')

    // const postList = document.createElement('ul')
    // postList.classList.add('post-list')

    // pageContent.append(postList)

    // posts.map(async post => {
    //     const postId = await getComments (post.id)
    //     const userName = await getUser(post.userId)

    //     const postTitle = post.title

    //     const postItem = document.createElement('li')
    //     postItem.classList.add('post-item')

    //     postItem.innerHTML = `<a href="./posts.html">Post Title: ${postTitle}. Post author: ${userName}. (comment count: ${postId}) </a>`

    //     postList.append(postItem)


// getPosts()