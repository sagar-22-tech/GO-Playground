export const myApis = [
    {
        id: "hello",
        name: "Hello API",
        description:
            "Returns a greeting with current time.",
        method: "GET",
        endpoint: "https://golang-apis-dox2.onrender.com/greet",
        body: {
            
        },
        headers: {
            "Content-Type": "application/json",
        },
    },
    {
        id: "user",
        name: "User API",
        description:
            "Returns mock data of users details",
        method: "GET",
        endpoint: "https://golang-apis-dox2.onrender.com/users",
        body: {
            
        },
        headers: {
            "Content-Type": "application/json",
        },
    },
    {
        id: "user{}",
        name: "User API ID",
        description:
            "Search users by their ID",
        method: "GET",
        endpoint: "https://golang-apis-dox2.onrender.com/users/:id",
        body: {
            
        },
        headers: {
            "Content-Type": "application/json",
        },
    },
    {
    id: "user-search",
    name: "Search Users",
    description: "Search users by their first name",
    method: "GET",
    endpoint: "https://golang-apis-dox2.onrender.com/users?search=:search",
    body: {},
    headers: {
        "Content-Type": "application/json",
    },
},
    

    
];