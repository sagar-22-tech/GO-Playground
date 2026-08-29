import { Button } from "@/components/ui/button";

function Sidebar({ activePage, setActivePage }) {
    const navigation = [
        { label: "Overview", value: "overview" },
        { label: "API Explorer", value: "explorer" },
        { label: "Request History", value: "history" },
    ];

    return (
        <aside className="hidden w-60 shrink-0 border-r p-4 md:block">
            <p className="mb-3 text-xs text-muted-foreground">
                PLAYGROUND
            </p>

            <div className="space-y-1">
                {navigation.map((item) => (
                    <Button
                        key={item.value}
                        onClick={() =>
                            setActivePage(item.value)
                        }
                        variant={
                            activePage === item.value
                                ? "secondary"
                                : "ghost"
                        }
                        className="w-full cursor-pointer justify-start"
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;