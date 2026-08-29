import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function Navbar({ activePage, setActivePage }) {
    const navigation = [
        { label: "Overview", value: "overview" },
        { label: "API Explorer", value: "explorer" },
        { label: "Request History", value: "history" },
    ];

    const currentPage =
        navigation.find((item) => item.value === activePage)?.label ||
        "Overview";

    return (
        <>
            <nav className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <div className="min-w-0">
                    <h1 className="text-lg font-semibold">
                        GO Playground
                    </h1>

                    <p className="hidden text-sm text-muted-foreground sm:block">
                        Backend API Control Center
                    </p>
                </div>

                {/* Desktop status */}
                <Badge className="hidden sm:inline-flex">
                    API ONLINE
                </Badge>

                {/* Mobile navigation */}
                <select
                    value={activePage}
                    onChange={(e) =>
                        setActivePage(e.target.value)
                    }
                    className="cursor-pointer rounded-md border bg-background px-3 py-2 text-sm sm:hidden"
                    aria-label="Navigation"
                >
                    {navigation.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* Mobile status */}
                <Badge className="sm:hidden">
                    ONLINE
                </Badge>
            </nav>

            <Separator />
        </>
    );
}

export default Navbar;