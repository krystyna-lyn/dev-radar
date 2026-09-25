import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database/event.model"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const Home = async () => {

  const response = await fetch(`${BASE_URL}/api/events`);

  const { events } = await response.json();

  return (
    <section>
      <div className="text-center text-2xl font-bold mt-10">
        <h1>Discover developer events near you</h1>

        <p className="text-lg font-normal mt-5">Find and explore developer events happening in your area. Connect with like-minded individuals and expand your network.</p>
        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {events && events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>

  )
}

export default Home