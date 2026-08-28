import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


function Navbar() {
    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4">
                <div>
                    <h1 className="text-lg font-semibold">GO Playground</h1>
                    <p className="text-sm text-muted-foreground">Backend API Control Center</p>
                </div>
                <Badge>API ONLINE</Badge>
            </nav>
            <Separator />
        </>
    )
}
export default Navbar