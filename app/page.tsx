import LoadMore from "@/components/LoadMore";
import AnimeCard, {AnimeProp} from "@/components/AnimeCard";
import {fetchAnime} from "@/lib/action";

export default async function Home() {


    return (
        <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-3xl text-white font-bold">Explore Anime</h2>
            <LoadMore/>
        </main>
    );
}
