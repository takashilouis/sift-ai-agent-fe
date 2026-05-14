import { AppLayout, AppTopBar } from "@/components/layout";

const mockHistory = [
    {
        id: "1",
        query: "Compare the best wireless earbuds under $200",
        date: "2026-04-10",
        mode: "Comparison",
        sentiment: 8.2,
        products: 5,
        summary: "Apple AirPods Pro 2, Sony WF-1000XM5, and Samsung Galaxy Buds2 Pro are top picks for battery and ANC.",
    },
    {
        id: "2",
        query: "Analyze reviews for MacBook Pro vs Dell XPS",
        date: "2026-04-09",
        mode: "Sentiment",
        sentiment: 7.5,
        products: 2,
        summary: "MacBook Pro praised for battery and build, XPS for value. Both have strong user satisfaction.",
    },
];

export default function HistoryPage() {
    return (
        <AppLayout topBar={<AppTopBar title="Research History" badge="Reports" />}> 
            <div className="max-w-5xl mx-auto py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-headline text-2xl font-bold text-primary">Your Research Reports</h2>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search..." className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm" />
                        <select className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm">
                            <option>All Modes</option>
                            <option>Product Analysis</option>
                            <option>Comparison</option>
                            <option>Sentiment</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockHistory.map((item) => (
                        <div key={item.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <span className="font-bold text-on-surface font-headline">{item.query}</span>
                            </div>
                            <div className="flex gap-4 text-xs text-tertiary">
                                <span>{item.date}</span>
                                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-bold text-xs">{item.mode}</span>
                                <span>Sentiment: <span className="font-bold text-green-700">{item.sentiment}</span></span>
                                <span>Products: <span className="font-bold">{item.products}</span></span>
                            </div>
                            <div className="text-sm text-on-surface-variant line-clamp-2">{item.summary}</div>
                            <div className="flex gap-2 mt-2">
                                <button className="btn-primary-gradient px-4 py-2 text-xs rounded-lg">View Report</button>
                                <button className="bg-error/10 text-error px-4 py-2 text-xs rounded-lg">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Empty state */}
                {mockHistory.length === 0 && (
                    <div className="text-center text-tertiary py-20">No research reports yet. Start your first research!</div>
                )}
            </div>
        </AppLayout>
    );
}
