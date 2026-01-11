import {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

type Props = {
    title: string;
    description: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
};

export function ConfirmDialog({
    title,
    description,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    onConfirm,
}: Props) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    {confirmLabel}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
