export function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('bg-light', 'py-5', 'mt-5')
    const divElement = document.createElement('div')
    divElement.classList.add('container', 'text-center')
    const pElement = document.createElement('p');
    pElement.classList.add('m-0', 'fs-5')
    pElement.innerHTML = 'Copyright &copy; 2023 JSON Placeholder';

    divElement.append(pElement)
    footer.append(divElement);

    return footer
}