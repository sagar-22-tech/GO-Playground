import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { myApis } from "@/data/apis";

function MainContent({
    activePage,
    requestHistory,
    setRequestHistory,
}) {
    const [method, setMethod] = useState("GET");
    const [endpoint, setEndpoint] = useState("");
    const [response, setResponse] = useState(null);
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiSource, setApiSource] = useState("my");
    const [copiedApi, setCopiedApi] = useState(null);
    const [apiStatus, setApiStatus] = useState("checking");

    const [headers, setHeaders] = useState([
        { key: "", value: "" },
    ]);

    const [visibleApis, setVisibleApis] = useState(3);
    const totalRequests = requestHistory.length;

    useEffect(() => {
        if (activePage !== "overview") {
            return;
        }

        const checkServer = async () => {
    setApiStatus("checking");

    try {
        const res = await fetch(
            "https://golang-apis-dox2.onrender.com/health"
        );

        if (res.ok) {
            setApiStatus("online");
        } else {
            setApiStatus("offline");
        }
    } catch (error) {
        console.error("API status check failed:", error);
        setApiStatus("offline");
    }
};

        checkServer();
    }, [activePage]);

    const successfulRequests = requestHistory.filter(
        (request) =>
            request.status >= 200 &&
            request.status < 300
    ).length;

    const averageLatency =
        requestHistory.length > 0
            ? Math.round(
                requestHistory.reduce(
                    (total, request) =>
                        total + (request.responseTime || 0),
                    0
                ) / requestHistory.length
            )
            : 0;

    // Reset visible APIs whenever API source changes
    useEffect(() => {
        setVisibleApis(3);
    }, [apiSource]);

    const handleSend = async () => {
        setLoading(true);
        const startTime = performance.now();

        if (!endpoint.trim()) {
            setResponse({
                status: 400,
                statusText: "Bad Request",
                body: {
                    error: "Please enter an API endpoint",
                },
            });

            setLoading(false);
            return;
        }

        if (["POST", "PUT", "PATCH"].includes(method)) {
            try {
                JSON.parse(body);
            } catch (error) {
                setResponse({
                    status: 400,
                    statusText: "Bad Request",
                    body: {
                        error: "Invalid JSON body",
                    },
                });

                setLoading(false);
                return;
            }
        }

        try {
            const requestHeaders = {};

            headers.forEach((header) => {
                if (
                    header.key.trim() &&
                    header.value.trim()
                ) {
                    requestHeaders[header.key.trim()] =
                        header.value.trim();
                }
            });

            const res = await fetch(endpoint, {
                method,
                headers: requestHeaders,
                body: ["POST", "PUT", "PATCH"].includes(method)
                    ? body
                    : undefined,
            });

            const responseTime = Math.round(
                performance.now() - startTime
            );

            const contentType =
                res.headers.get("content-type") || "";

            let data;

            if (contentType.includes("application/json")) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            setResponse({
                status: res.status,
                statusText: res.statusText,
                body: data,
                responseTime,
            });

            setRequestHistory((prev) => [
                ...prev,
                {
                    method,
                    endpoint,
                    status: res.status,
                    statusText: res.statusText,
                    body: data,
                    timestamp: new Date().toLocaleTimeString(),
                    responseTime,
                },
            ]);
        } catch (error) {
            console.error(error);

            setResponse({
                status: 0,
                statusText: "Network Error",
                body: {
                    error: "Unable to connect to the API",
                    message:
                        "Check the endpoint URL, CORS policy, or server status.",
                },
            });

            setRequestHistory((prev) => [
                ...prev,
                {
                    method,
                    endpoint,
                    status: 0,
                    statusText: "Network Error",
                    body: {
                        error: "Unable to connect to the API",
                    },
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const addHeader = () => {
        setHeaders((prev) => [
            ...prev,
            { key: "", value: "" },
        ]);
    };

    const updateHeader = (index, field, value) => {
        setHeaders((prev) =>
            prev.map((header, i) =>
                i === index
                    ? { ...header, [field]: value }
                    : header
            )
        );
    };

    const removeHeader = (index) => {
        setHeaders((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
        <main className="flex-1 p-6">
            <h1 className="text-2xl font-semibold capitalize">
                {activePage.replace("-", " ")}
            </h1>

            <p className="mt-2 text-muted-foreground">
                Backend API Control Center
            </p>

            {/* Overview */}
            {activePage === "overview" && (
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* API Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>API Status</CardTitle>

                            <CardDescription>
                                Current backend status
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-2 w-2 rounded-full ${apiStatus === "online"
                                            ? "bg-green-500"
                                            : apiStatus === "offline"
                                                ? "bg-red-500"
                                                : "bg-yellow-500"
                                        }`}
                                ></span>

                                <span className="font-medium">
                                    {apiStatus === "online"
                                        ? "Online"
                                        : apiStatus === "offline"
                                            ? "Offline"
                                            : "Checking..."}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {apiStatus === "online"
                                    ? "Go API is operational"
                                    : apiStatus === "offline"
                                        ? "Go API is unreachable"
                                        : "Checking Go API server..."}
                            </p>
                        </CardContent>
                    </Card>


                    {/* Total Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Requests</CardTitle>

                            <CardDescription>
                                Total API requests
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">
                                {totalRequests}
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Requests made through the playground
                            </p>
                        </CardContent>
                    </Card>


                    {/* Average Latency */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Latency</CardTitle>

                            <CardDescription>
                                Average API response time
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">
                                {averageLatency} ms
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Based on your requests
                            </p>
                        </CardContent>
                    </Card>

                </div>
            )}

            {/* API Explorer */}
            {activePage === "explorer" && (
                <div className="mt-8 max-w-4xl">

                    {/* API Source */}
                    <div className="mb-6">
                        <label className="text-sm font-medium">
                            API Source
                        </label>

                        <select
                            value={apiSource}
                            onChange={(e) =>
                                setApiSource(e.target.value)
                            }
                            className="mt-2 rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="my">
                                My APIs
                            </option>

                            <option value="custom">
                                Custom API
                            </option>
                        </select>
                    </div>

                    {/* My APIs */}
                    {apiSource === "my" && (
                        <div className="mb-6">

                            <div className="mb-3">
                                <p className="text-sm font-medium">
                                    My Go APIs
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    APIs provided by your Go backend
                                </p>
                            </div>

                            <div className="space-y-3">

                                {myApis
                                    .slice(0, visibleApis)
                                    .map((api) => (
                                        <Card
                                            key={api.id}
                                            className="cursor-pointer transition-shadow hover:shadow-md"
                                        >
                                            <CardContent className="p-4">
                                                <button
                                                    className="w-full text-left"
                                                    onClick={() => {
                                                        setMethod(api.method);
                                                        setEndpoint(api.endpoint);

                                                        setResponse(null);

                                                        if (api.body) {
                                                            setBody(
                                                                JSON.stringify(
                                                                    api.body,
                                                                    null,
                                                                    2
                                                                )
                                                            );
                                                        } else {
                                                            setBody("");
                                                        }

                                                        setHeaders(
                                                            Object.entries(
                                                                api.headers || {}
                                                            ).map(([key, value]) => ({
                                                                key,
                                                                value,
                                                            }))
                                                        );
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <Badge
                                                                className={
                                                                    api.method === "GET"
                                                                        ? "bg-green-500 text-white hover:bg-green-500"
                                                                        : api.method === "POST"
                                                                            ? "bg-blue-500 text-white hover:bg-blue-500"
                                                                            : api.method === "PUT"
                                                                                ? "bg-orange-500 text-white hover:bg-orange-500"
                                                                                : api.method === "PATCH"
                                                                                    ? "bg-purple-500 text-white hover:bg-purple-500"
                                                                                    : api.method === "DELETE"
                                                                                        ? "bg-red-500 text-white hover:bg-red-500"
                                                                                        : ""
                                                                }
                                                            >
                                                                {api.method}
                                                            </Badge>

                                                            <span className="font-mono text-sm font-medium">
                                                                {api.endpoint}
                                                            </span>
                                                        </div>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className={`cursor-pointer ${copiedApi === api.id
                                                                ? "border-green-500 bg-green-500 text-white hover:bg-green-500 hover:text-white"
                                                                : ""
                                                                }`}
                                                            onClick={async (e) => {
                                                                e.stopPropagation();

                                                                try {
                                                                    await navigator.clipboard.writeText(api.endpoint);

                                                                    setCopiedApi(api.id);

                                                                    setTimeout(() => {
                                                                        setCopiedApi(null);
                                                                    }, 2000);
                                                                } catch (error) {
                                                                    console.error("Failed to copy endpoint:", error);
                                                                }
                                                            }}
                                                        >
                                                            {copiedApi === api.id ? "Copied!" : "Copy"}
                                                        </Button>
                                                    </div>

                                                    <p className="mt-3 text-sm font-semibold">
                                                        {api.name}
                                                    </p>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {api.description}
                                                    </p>
                                                </button>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>

                            {/* Load More */}
                            {visibleApis < myApis.length && (
                                <div className="mt-4 flex justify-center">

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setVisibleApis(
                                                (prev) =>
                                                    prev + 3
                                            )
                                        }
                                    >
                                        Load More
                                    </Button>

                                </div>
                            )}
                        </div>
                    )}

                    {/* Request */}
                    <div>
                        <p className="mb-2 text-sm font-medium">
                            Request
                        </p>

                        <div className="flex gap-2">

                            <select
                                value={method}
                                onChange={(e) =>
                                    setMethod(
                                        e.target.value
                                    )
                                }
                                className="rounded-md border px-3 py-2 text-sm"
                            >
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>PATCH</option>
                                <option>DELETE</option>
                            </select>

                            <input
                                type="text"
                                placeholder="https://api.example.com/users"
                                value={endpoint}
                                onChange={(e) =>
                                    setEndpoint(
                                        e.target.value
                                    )
                                }
                                className="flex-1 rounded-md border px-3 py-2 text-sm"
                            />

                            <Button
                                onClick={handleSend}
                                disabled={loading}
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send"}
                            </Button>

                        </div>

                        {/* Headers */}
                        <div className="mt-4">

                            <div className="flex items-center justify-between">

                                <label className="text-sm font-medium">
                                    Headers
                                </label>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addHeader}
                                >
                                    + Add Header
                                </Button>

                            </div>

                            <div className="mt-2 space-y-2">

                                {headers.map(
                                    (header, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2"
                                        >

                                            <input
                                                type="text"
                                                placeholder="Header name"
                                                value={
                                                    header.key
                                                }
                                                onChange={(e) =>
                                                    updateHeader(
                                                        index,
                                                        "key",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="flex-1 rounded-md border px-3 py-2 text-sm"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Header value"
                                                value={
                                                    header.value
                                                }
                                                onChange={(e) =>
                                                    updateHeader(
                                                        index,
                                                        "value",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="flex-1 rounded-md border px-3 py-2 text-sm"
                                            />

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    removeHeader(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>

                                        </div>
                                    )
                                )}

                            </div>
                        </div>

                        {/* Request Body */}
                        {["POST", "PUT", "PATCH"].includes(
                            method
                        ) && (
                                <div className="mt-4">

                                    <label className="text-sm font-medium">
                                        Request Body
                                    </label>

                                    <textarea
                                        value={body}
                                        onChange={(e) =>
                                            setBody(
                                                e.target.value
                                            )
                                        }
                                        placeholder='{"name":"Sagar"}'
                                        className="mt-2 min-h-32 w-full rounded-md border p-3 font-mono text-sm"
                                    />

                                </div>
                            )}

                        {/* Response */}
                        {response && (
                            <Card className="mt-6">

                                <CardHeader>

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <CardTitle>
                                                Response
                                            </CardTitle>

                                            <CardDescription>
                                                Response received from the API
                                            </CardDescription>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`rounded-md px-3 py-1 text-sm font-medium ${response.status >=
                                                    200 &&
                                                    response.status <
                                                    300
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {response.status}{" "}
                                                {
                                                    response.statusText
                                                }
                                            </span>

                                            {response.responseTime !==
                                                undefined && (
                                                    <span className="text-sm text-muted-foreground">
                                                        {
                                                            response.responseTime
                                                        }{" "}
                                                        ms
                                                    </span>
                                                )}

                                        </div>

                                    </div>

                                </CardHeader>

                                <CardContent>

                                    <pre className="max-h-96 overflow-auto rounded-md border p-4 text-sm">
                                        {JSON.stringify(
                                            response.body,
                                            null,
                                            2
                                        )}
                                    </pre>

                                </CardContent>

                            </Card>
                        )}

                    </div>

                </div>
            )}

            {/* Request History */}
            {activePage === "history" && (
                <div className="mt-8">

                    <div className="mb-4 flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-semibold">
                                Request History
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Previous API requests
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setRequestHistory([])
                            }
                        >
                            Clear History
                        </Button>

                    </div>

                    <div className="space-y-3">

                        {requestHistory.length === 0 ? (
                            <p className="text-muted-foreground">
                                No requests yet.
                            </p>
                        ) : (
                            requestHistory.map(
                                (request, index) => (
                                    <Card key={index}>

                                        <CardContent className="flex items-center justify-between p-4">

                                            {/* Method + Endpoint */}
                                            <div className="flex items-center gap-3">

                                                <span className="font-mono text-sm font-semibold">
                                                    {request.method}
                                                </span>

                                                <span className="text-sm">
                                                    {
                                                        request.endpoint
                                                    }
                                                </span>

                                            </div>

                                            {/* Status + Response Time + Timestamp */}
                                            <div className="flex items-center gap-3">

                                                <Badge
                                                    className={
                                                        request.status >=
                                                            200 &&
                                                            request.status <
                                                            300
                                                            ? "bg-green-500 text-white hover:bg-green-500"
                                                            : ""
                                                    }
                                                    variant={
                                                        request.status >=
                                                            200 &&
                                                            request.status <
                                                            300
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                >
                                                    {request.status ===
                                                        0
                                                        ? "Network Error"
                                                        : `${request.status} ${request.statusText}`}
                                                </Badge>

                                                {/* Response Time */}
                                                {request.responseTime !==
                                                    undefined && (
                                                        <span className="text-xs font-medium text-muted-foreground">
                                                            {
                                                                request.responseTime
                                                            }{" "}
                                                            ms
                                                        </span>
                                                    )}

                                                {/* Timestamp */}
                                                <span className="text-xs text-muted-foreground">
                                                    {
                                                        request.timestamp
                                                    }
                                                </span>

                                            </div>

                                        </CardContent>

                                    </Card>
                                )
                            )
                        )}

                    </div>
                </div>
            )}
        </main>
    );
}

export default MainContent;