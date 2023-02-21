import { MENU_ITEMS } from "./config.js";

export function createPageMainHeader(showCategories = true) {
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
  menuList.classList.add('menu');

  MENU_ITEMS.forEach(menuItem => {
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

function createOptionElement(arr, element) {
  arr.map(item => {
    const optionElement = document.createElement('option')
    optionElement.classList.add('option-element')
    const upperCaseItem = item.charAt(0).toUpperCase() + item.slice(1)
    optionElement.textContent = upperCaseItem
    element.append(optionElement)
  })
}
