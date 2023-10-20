import NextjsPackages from "@/components/nextjs-packages";
import TheLatest from "@/components/the-latest";
import Trending from "@/components/trending";
import Tutorials from "@/components/tutorials";

export default function Page() {
    return (
        <div className="container space-y-16">
            <TheLatest />
            <Trending />
            <Tutorials />
            <NextjsPackages />
        </div>
    )
}
