'use client'
import Image from "next/image";
import {useInView} from "react-intersection-observer";
import {useEffect, useRef, useState} from "react";
import {fetchAnime} from "@/lib/action";
import AnimeCard, {AnimeProp} from "@/components/AnimeCard";
import {motion} from "framer-motion";

let page = 1

function LoadMore() {
    const {ref, inView} = useInView();
    const [data, setData] = useState<AnimeProp[]>([]);


    useEffect(() => {
        const loaderData = async () => {
            if (inView) {
                const res = await fetchAnime(page);
                setData(prev => [...prev, ...res]);
                page++;
            }
        }
        loaderData();
    }, [inView, data]);


    const containerVariants = {
        hidden: {
            opacity: 0 //move out of the site
        },
        visible: {
           opacity:1,
            transition: {
                delay: 0.1,
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    };


    return (
        <>
             <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {data.map((item: AnimeProp, index: number) => (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible"   key={index}>
                        <AnimeCard anime={item} index={index}/>
                    </motion.div>
                ))}
            </section>
            <section className="flex justify-center items-center w-full">
                <div ref={ref}>
                    <Image
                        src="./spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>
            </section>
        </>
    );
}

export default LoadMore;