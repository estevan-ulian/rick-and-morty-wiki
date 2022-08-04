interface HeadingProps {
    children: string;
    text: 'center' | 'left' | 'right'
}

export default function Heading({ children, text = 'center' }: HeadingProps) {
    return (
        <>
            <h1 className={`text-${text} text-4xl md:text-5xl font-bold text-slate-800`}>
                {children}
            </h1>
        </>
    )
}