type Props = {
    users: string[];
};

export function TypingIndicator({ users }: Props) {
    if (!users.length) return null;

    const text =
        users.length === 1
            ? `${users[0]} está digitando...`
            : `${users.join(", ")} estão digitando...`;

    return (
        <div className="px-4 py-1 text-xs italic text-muted-foreground">
            {text}
        </div>
    );
}
