export function firstLetterUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1)
}

export async function fetchData(url, param) {
    const res = await fetch(url, param)
    const data = await res.json()

    return data
}

export function getParams(param) {
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const value = urlParams.get(param)

    return value
}

export function createTopPostLink(post, index) {
    const topPostLink = document.createElement('a')
    topPostLink.classList.add('top-post-link')
    topPostLink.href = `./post.html?post_id=${post.id}`
    const title = document.createElement('h3')
    const postNr = index + 1
    title.textContent = `${postNr}.  ${firstLetterUpperCase(post.title)}`
    title.classList.add('top-post-title', 'fs-5', 'px-4', 'mx-auto')
    topPostLink.append(title)

    return topPostLink
}

export function createTopPostWrapper(topPostLink) {
    const topPostWrapper = document.createElement('div')
    topPostWrapper.classList.add('top-post-wrapper', 'px-4' )

    topPostWrapper.append(topPostLink)

    return topPostWrapper
}

export function textTruncate(text, long) {
    if (text.length > long) {
        text = text.slice(0, long) + '...'
    }
    return text
}

export function deletePreviousElement(className) {
    const prevElement = document.querySelector(`${className}`)
    if (prevElement) {
        prevElement.remove()
    }
}