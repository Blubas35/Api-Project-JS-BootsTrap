export function createPageMainHeader() {
    const header = document.createElement('header');
    header.classList.add('main-header')
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('image-wrapper')
    const mainLogo = document.createElement('img')
    mainLogo.classList.add('main-logo')
    const nav = document.createElement('nav');
    nav.classList.add('main-navigation');
    const form = document.createElement('form')
    form.classList.add('form')

    const searchInput = document.createElement('input')
    searchInput.classList.add('search-input')
    searchInput.setAttribute('placeholder', 'Type to search')
    searchInput.setAttribute('name', 'search')
    const submitButton = document.createElement('input')
    submitButton.classList.add('submit-button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('value', 'Search')

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

    submitButton.addEventListener('click', () => {

      form.setAttribute('action', './search.html')
    })

    form.append(searchInput, submitButton)
    imageWrapper.append(mainLogo)
    nav.append(menuList, form);
    header.append(imageWrapper, nav);

    return header;
  }