async function init() {
    const newUserData = {
        title: 'Pavadinimas',
        body: 'Aprasymas',
        userId: 5,
    }
    const fetchParams = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newUserData)
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/posts', fetchParams)

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    //     body: JSON.stringify(newUserData)
    // })

    const newPost = await res.json()

    console.log(newPost)
    console.log(newPost.title)
}

init()