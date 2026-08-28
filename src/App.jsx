import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import MainContent from "./components/MainContent";

function App() {
    const [activePage, setActivePage] = useState("overview");
    const [requestHistory, setRequestHistory] = useState(() => {
        const savedHistory = localStorage.getItem("requestHistory");

        return savedHistory
            ? JSON.parse(savedHistory)
            : [];
    });
    useEffect(() => {
        localStorage.setItem(
            "requestHistory",
            JSON.stringify(requestHistory)
        );
    }, [requestHistory]);

    return (
        <>
            <Navbar />

            <div className="flex min-h-screen">
                <Sidebar
                    activePage={activePage}
                    setActivePage={setActivePage}
                />

                <MainContent
                    activePage={activePage}
                    requestHistory={requestHistory}
                    setRequestHistory={setRequestHistory}
                />
            </div>
        </>
    );
}

export default App;