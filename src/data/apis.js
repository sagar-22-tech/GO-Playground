export const myApis = [
    {
        id: "hello",
        name: "Hello API",
        description:
            "Returns a greeting using the name provided in the request body.",
        method: "POST",
        endpoint: "http://localhost:8080/",
        body: {
            name: "Sagar",
        },
        headers: {
            "Content-Type": "application/json",
        },
    },

    
];