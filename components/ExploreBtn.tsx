'use client'

import Image from "next/image"

const ExploreBtn = () => {
    return (
        <section>
            <button type="button" id="explore-btn" className="mt-7 m-auto" onClick={() => console.log('clicked')}>
                <a href="/events">
                    Explore Events
                    <Image src="/icons/arrow-down.svg" alt="arrow down" width={24} height={24} className="w-4 h-auto" />
                </a>
            </button>

        </section>
    )
}

export default ExploreBtn