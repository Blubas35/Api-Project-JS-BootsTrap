import { MENU_ITEMS } from "./config.js";

export function createPageMainHeader(showCategories = true) {
  
  const navigation = document.createElement('nav');
  navigation.classList.add('navbar', 'navbar-expand-lg', 'bg-body-tertiary')
  const divContainerNavigation = document.createElement('div')
  divContainerNavigation.classList.add('container', 'px-4', 'px-lg-5')
  const imageWrapperAElement = document.createElement('a')
  imageWrapperAElement.classList.add('navbar-brand')
  imageWrapperAElement.href = '/index.html'
  imageWrapperAElement.textContent = 'JSON website'

  let logoHTML = `<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
  Menu
  <i class="fas fa-bars"></i>
  </button>`
  divContainerNavigation.innerHTML = logoHTML

  const divContainerMenu = document.createElement('div')
  divContainerMenu.classList.add('collapse', 'navbar-collapse', 'column-gap-3')
 
  const form = document.createElement('form')
  form.classList.add('form')



  // const header = document.createElement('header');
  // header.classList.add('main-header', 'container', 'row')
  // const imageWrapper = document.createElement('div')
  // imageWrapper.classList.add('image-wrapper', 'col')
  // const mainLogo = document.createElement('img')
  // mainLogo.classList.add('main-logo')
  // const divElementHeader = document.createElement('div')
  // divElementHeader.classList.add('col')
  // const nav = document.createElement('nav');
  // const divElementNav = document.createElement('div')
  // divElementNav.classList.add('col')
  // nav.classList.add('main-navigation', 'col');
  // const form = document.createElement('form')
  // form.classList.add('form')
  

  if (!showCategories) {
    const selectElement = document.createElement('select')
    selectElement.classList.add('select-element')
    const optionArr = ['posts', 'users', 'albums']

    createOptionElement(optionArr, selectElement)
    form.append(selectElement)
  }

  const searchInput = document.createElement('input')
  searchInput.classList.add('search-input')
  searchInput.setAttribute('placeholder', 'Type to search')
  searchInput.setAttribute('name', 'search')
  const submitButton = document.createElement('input')
  submitButton.classList.add('submit-button')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('value', 'Search')

  const menuList = document.createElement('ul');
  menuList.classList.add('menu', 'navbar-nav', 'column-gap-3', 'mb-2', 'mb-lg-0',  'ms-auto');

  MENU_ITEMS.forEach(menuItem => {
    let { title, path } = menuItem;

    const menuItemElement = document.createElement('li');
    menuItemElement.classList.add('menu-item', 'nav-item');

    if (location.pathname === '/' + path) {
      menuItemElement.classList.add('active');
    }
    const menuLink = document.createElement('a');
    menuLink.textContent = title;
    menuLink.href = './' + path;
    menuLink.classList.add('nav-item', 'text-decoration-none')

    menuItemElement.append(menuLink);
    menuList.append(menuItemElement);
  })

  submitButton.addEventListener('click', () => {

    form.setAttribute('action', './search.html')
  })

  // form.append(searchInput, submitButton)
  // imageWrapper.append(mainLogo)
  // divElementNav.append(menuList, form)
  // nav.append(divElementNav);
  // header.append(imageWrapper, divElementHeader, nav);
  form.append(searchInput, submitButton)
  divContainerMenu.append(menuList, form)
  divContainerNavigation.append(imageWrapperAElement, divContainerMenu)
  navigation.append(divContainerNavigation)


  return navigation;
  // return header;
}

function createOptionElement(arr, element) {
  arr.map(item => {
    const optionElement = document.createElement('option')
    optionElement.classList.add('option-element')
    const upperCaseItem = item.charAt(0).toUpperCase() + item.slice(1)
    optionElement.textContent = upperCaseItem
    element.append(optionElement)
  })
}
