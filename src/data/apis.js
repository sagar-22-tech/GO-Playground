export const myApis = [
    {
        id: "hello",
        name: "Hello API",
        description:
            "Returns a greeting using the name provided in the request body.",
        method: "POST",
        endpoint: "https://golang-apis-dox2.onrender.com/api/v1/greet",
        body: {
            name: "Sagar",
        },
        headers: {
            "Content-Type": "application/json",
        },
    },

    
];