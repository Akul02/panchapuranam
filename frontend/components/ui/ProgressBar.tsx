export interface ProgressBarProps {
    completed: number;
    total: number;
    className?: string,
    isCompleted?: boolean;
}

export default function ProgressBar({
    completed,
    total,
    className,
    isCompleted = completed === total && total > 0,
}: ProgressBarProps) {
    
    const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    return (
        <div className={`${className} flex items-center gap-4`}>
            <div className="flex-1 h-1.5 rounded-full bg-[#F0EAD9] overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? "bg-[#5C9142]" : "bg-[#D6A360]"
                    }`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="text-xs font-semibold text-[#8A6A52] min-w-[32px] text-right">
                {completed}/{total}
            </span>
        </div>
    );
}
