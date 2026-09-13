'use client'

import Image from "next/image"
import EventCard from "./EventCard"
import { events } from "@/lib/constants/events"

const ExploreBtn = () => {
    return (
        <section>
            <button type="button" id="explore-btn" className="mt-7 m-auto" onClick={() => console.log('clicked')}>
                <a href="/events">
                    Explore Events
                    <Image src="/icons/arrow-down.svg" alt="arrow down" width={24} height={24} />
                </a>
            </button>
            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    )
}

export default ExploreBtn