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

export function createTopPostLink(post) {
    const topPostLink = document.createElement('a')
    topPostLink.classList.add('top-post-link')
    topPostLink.href = `./post.html?post_id=${post.id}`
    const title = document.createElement('h3')
    title.textContent = post.title
    title.classList.add('top-post-title')
    topPostLink.append(title)

    return topPostLink
}

export function createTopPostWrapper(topPostLink) {
    const topPostWrapper = document.createElement('div')
    topPostWrapper.classList.add('top-post-wrapper')

    topPostWrapper.append(topPostLink)

    return topPostWrapper
}