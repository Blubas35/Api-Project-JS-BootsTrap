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
    postsTitle.classList.add('posts-title')
    postsTitle.textContent = 'Featured posts'

    pageContent.append(postsTitle, postsList);
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
      postLink.textContent = firstLetterUpperCase(post.title);
      postLink.href = './post.html?post_id=' + post.id;
  
      const postAuthor = document.createElement('a');
      postAuthor.textContent = ` ${userName}`;
      postAuthor.href = './user.html?user_id=' + post.userId;
  
      postItem.append(postLink, '. By: ', postAuthor);
  
      postsList.append(postItem);
    })
  
    return postsList;
  }
 
  init();