function init() {
    const id = 5
    const post = fetchData(API_URL + '/posts' + id)
    console.log(post)


    // cia reikia redaguoti visus duomenis

    // fetch('https://jsonplaceholder.typicode.com/posts/1', {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         id: 1,
    //         title: 'naujas pavadinimas',
    //         body: 'naujas turinys',
    //         userId: 1,
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));


    // jeigu noriu tik viena dalyka pakeisti pvs: pavadinima

    // fetch('https://jsonplaceholder.typicode.com/posts/1', {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //         title: 'keiciamas pavadinimas',
    //         userId
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));


    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });


}

init()