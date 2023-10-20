import Link from "next/link";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Logo({ ...props }: InputProps) {
    return (
        <>
        <Link href="/">
            <span className="text-xl font-bold tracking-tight">Next.js News</span>
        </Link>
        </>
    );
}
