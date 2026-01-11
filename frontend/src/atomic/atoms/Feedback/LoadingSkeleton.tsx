export function LoadingSkeleton() {
    return (
        <div className="flex-1 p-4 space-y-3">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-5 w-full bg-muted rounded animate-pulse" />
            ))}
        </div>
    );
}
