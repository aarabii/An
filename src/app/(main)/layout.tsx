import Navbar from "@/components/common/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
        </div>
    );
}
