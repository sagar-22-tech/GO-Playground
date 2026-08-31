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
            "Returns mock data of user detail using it's ID number",
        method: "GET",
        endpoint: "https://golang-apis-dox2.onrender.com/users/:id",
        body: {
            
        },
        headers: {
            "Content-Type": "application/json",
        },
    },

    
];