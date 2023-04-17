export function createHeroBox(title, options = {}) {
    const heroBoxElement = document.createElement('div')
    heroBoxElement.classList.add('masthead', 'd-flex', 'justify-content-center')

    if (options.backgroundImage) {
        heroBoxElement.style.backgroundImage = options.backgroundImage
    }

    const heroBoxContentWrapper = document.createElement('div')
    heroBoxContentWrapper.classList.add('align-self-center')

    if (title) {
        const heroBoxContent = document.createElement('div')
        heroBoxContent.classList.add('hero-box-content')

        const heroBoxTitle = document.createElement('h1')
        heroBoxTitle.classList.add()
        heroBoxTitle.textContent = title

        heroBoxContent.append(heroBoxTitle)
        heroBoxContentWrapper.append(heroBoxContent)
    }

    heroBoxElement.append(heroBoxContentWrapper)

    return heroBoxElement
}