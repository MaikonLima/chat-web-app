import type { PropsChatPage } from "@/stores/chat.types";

export function ChatTemplate({
    header,
    messages,
    input,
}: PropsChatPage) {
    return (
        <div className="flex flex-col h-screen min-w-screen">
            {header}
            {messages}
            {input}
        </div>
    );
}
