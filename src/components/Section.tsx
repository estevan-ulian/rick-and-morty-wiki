interface SectionProps {
    children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
    return (
        <>
            <section className="w-full my-10">
                {children}
            </section>
        </>
    )
}