import type { PropsLoginPage } from "@/stores/chat.types";

export function LoginTemplate({ content, footer }: PropsLoginPage) {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        {content}
        {footer ? <div className="text-center text-xs text-muted-foreground">{footer}</div> : null}
      </div>
    </div>
  );
}

