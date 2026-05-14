import { AppLayout, AppTopBar } from "@/components/layout";

export default function SettingsPage() {
    return (
        <AppLayout topBar={<AppTopBar title="Settings" badge="Account" />}> 
            <div className="max-w-3xl mx-auto py-12 space-y-10">
                {/* Profile Section */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                    <h2 className="font-headline text-xl font-bold mb-4 text-primary">Profile</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary text-2xl font-bold">AR</div>
                        <div>
                            <div className="font-semibold text-on-surface">Alex Rivera</div>
                            <div className="text-tertiary text-sm">alex@email.com</div>
                        </div>
                    </div>
                </section>
                {/* Preferences Section */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                    <h2 className="font-headline text-xl font-bold mb-4 text-primary">Research Preferences</h2>
                    <div className="flex flex-col gap-4">
                        <label className="flex items-center gap-4">
                            <span className="text-on-surface w-48">Default research mode</span>
                            <select className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm">
                                <option>Product Analysis</option>
                                <option>Comparison</option>
                                <option>Sentiment Check</option>
                            </select>
                        </label>
                        <label className="flex items-center gap-4">
                            <span className="text-on-surface w-48">Deep research by default</span>
                            <input type="checkbox" className="w-5 h-5 accent-primary" />
                        </label>
                        <label className="flex items-center gap-4">
                            <span className="text-on-surface w-48">Max products to analyze</span>
                            <input type="range" min="1" max="10" defaultValue="5" className="w-40 accent-primary" />
                        </label>
                    </div>
                </section>
                {/* Appearance Section */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                    <h2 className="font-headline text-xl font-bold mb-4 text-primary">Appearance</h2>
                    <div className="flex items-center gap-8">
                        <label className="flex items-center gap-2">
                            <span className="text-on-surface">Theme</span>
                            <select className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>System</option>
                            </select>
                        </label>
                        <label className="flex items-center gap-2">
                            <span className="text-on-surface">Font size</span>
                            <select className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm">
                                <option>Small</option>
                                <option selected>Medium</option>
                                <option>Large</option>
                            </select>
                        </label>
                    </div>
                </section>
                {/* API & Integrations */}
                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                    <h2 className="font-headline text-xl font-bold mb-4 text-primary">API & Integrations</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-on-surface w-48">API Key</span>
                        <input type="password" value="sk-xxxx-xxxx" readOnly className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm w-64" />
                        <button className="btn-primary-gradient px-4 py-2 text-sm rounded-lg">Copy</button>
                    </div>
                    <div className="mt-4 text-tertiary text-sm">Usage: 3/10 reports this month</div>
                </section>
                {/* Danger Zone */}
                <section className="bg-error/10 rounded-2xl p-8 shadow-sm">
                    <h2 className="font-headline text-xl font-bold mb-4 text-error">Danger Zone</h2>
                    <div className="flex gap-4">
                        <button className="bg-error text-white px-6 py-2 rounded-lg font-bold">Delete all research history</button>
                        <button className="bg-error text-white px-6 py-2 rounded-lg font-bold">Delete account</button>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
