import { AppLayout, AppTopBar } from "@/components/layout";
import { ChatInterface } from "./components/ChatInterface";

export default function ChatPage() {
    return (
        <AppLayout topBar={<AppTopBar title="AI Chat" badge="Assistant" />}> 
            <div className="h-full min-h-[calc(100vh-56px)]">
                <ChatInterface />
            </div>
        </AppLayout>
    );
}
