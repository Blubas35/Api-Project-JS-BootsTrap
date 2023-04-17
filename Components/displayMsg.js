export function displayPostMsg(text) {
    const postMsg = document.createElement('span')
    postMsg.classList.add('post-msg', 'position-fixed', 'bottom-0', 'end-0', 'p-3', 'bg-success', 'text-white')
    postMsg.textContent = `Post successfully ${text}!`

    postMsg.style.display = 'block';
    setTimeout(() => {
        postMsg.style.display = 'none';
    }, 3000);

    return postMsg
}