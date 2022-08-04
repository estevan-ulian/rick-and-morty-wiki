type ListDataProps = {
    children: any;
    className: string;
}

export default function ListData({ children, className }: ListDataProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}