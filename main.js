// GET data from api
// fetch("https://newtabusersapi.onrender.com/api/users")
//     .then(res => res.json())
//     .then(data => console.log(data))
// fetch("https://newtabusersapi.onrender.com/api/users?name=Sauri")
//     .then(res => {res.json()})
//     .then(data => console.log(data))

// POST data to an API
fetch("https://newTabUsersApi.onrender.com/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "name": "testAqkcc",
        "pass": "testPss"
    })
})
    .then(res => { return res.json() })
    .then(data => console.log(data))