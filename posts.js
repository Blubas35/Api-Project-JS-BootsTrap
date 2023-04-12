// https://jsonplaceholder.typicode.com/users/${userId}?_embed=posts
// https://jsonplaceholder.typicode.com/posts/?_expand=user (jeigu tevini paimti)
// https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15
import { createPageMainHeader } from './header.js'
import { firstLetterUpperCase } from './function.js';

async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user');
    const posts = await res.json();
  
    const pageContent = document.querySelector('#page-content');
    const header = createPageMainHeader();
    const postsList = createPostsListElement(posts);

    const postsTitle = document.createElement('h2')
    postsTitle.classList.add('posts-title', 'p-5', 'fs-1', 'text-dark', 'fw-bolder')
    postsTitle.textContent = 'Featured posts'
    pageContent.classList.add('px-6', 'px-4')

    pageContent.append(postsTitle, postsList);
    pageContent.before(header);
  }
  
  function createPostsListElement(posts) {

    const postsList = document.createElement('ul');
    postsList.classList.add('posts-list', 'data-list', 'row');

    posts.map(post => {
      const userName = post.user.name;
      
      const postItem = document.createElement('li');
      postItem.classList.add('post-item', 'col-12');
      
      const divWrapper = document.createElement('div')
      divWrapper.classList.add('div-wrapper')

      const divElement = document.createElement('div')
      divElement.classList.add('shadow-sm', 'col-xl-6', 'col-lg-7', 'col-md-10', 'p-3', 'mb-5', 'bg-body-tertiary', 'rounded', 'row', 'row-gap-2')
      
      const postLink = document.createElement('a');
      postLink.textContent = firstLetterUpperCase(post.title);
      postLink.href = './post.html?post_id=' + post.id;
      postLink.classList.add('post-link-title', 'order-2', 'fs-4', 'text-decoration-none', 'text-dark', 'fw-bolder')
  
      const postAuthor = document.createElement('a');
      postAuthor.textContent = ` ${userName}`;
      postAuthor.href = './user.html?user_id=' + post.userId;
      postAuthor.classList.add('post-author-link', 'text-secondary')

      const spanElement = document.createElement('span')
      spanElement.textContent = 'Posted by: '
      spanElement.classList.add('text-secondary')

      const authorWrapper = document.createElement('div')
      authorWrapper.classList.add('author-wrapper', 'order-1')

      const postBody = document.createElement('p')
      postBody.textContent = firstLetterUpperCase(post.body)
      postBody.classList.add('order-3', 'fs-5', 'fw-lighter')

      divWrapper.append(divElement)
      authorWrapper.append(spanElement, postAuthor)
      divElement.append(postLink, postBody, authorWrapper);
      postItem.append(divWrapper)
  
      postsList.append(postItem);
    })
  
    return postsList;
  }
 
  init();