import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { Suspense } from "react";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getEventBySlug = async (slug: string) => {
  "use cache";
  cacheLife("hours");

  const response = await fetch(`${BASE_URL}/api/events/${slug}`);

  if (!response.ok) {
    return null;
  }

  const { event } = await response.json();

  return event ?? null;
};

const SimilarEvents = async ({ slug }: { slug: string }) => {
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <div className="events">
      {similarEvents.length > 0 &&
        similarEvents.map((similarEvent: IEvent) => (
          <EventCard key={similarEvent._id.toString()} {...similarEvent} />
        ))}
    </div>
  );
};

const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex gap-2">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const bookings = 10;

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* Left side - Event details */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailsItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />

            <EventDetailsItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />

            <EventDetailsItem
              icon="/icons/pin.svg"
              alt="location"
              label={location}
            />

            <EventDetailsItem
              icon="/icons/mode.svg"
              alt="mode"
              label={mode}
            />

            <EventDetailsItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />

            <EventAgenda agendaItems={agenda} />

            <section className="flex-col-gap-2">
              <h2>About the Organizer</h2>
              <p>{organizer}</p>
            </section>

            <EventTags tags={tags} />
          </section>
        </div>

        {/* Right side - Booking form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            <p>
              Don&apos;t miss out on this exciting event! Reserve your spot now
              and be part of an unforgettable experience.
            </p>

            {bookings > 0 ? (
              <p className="text-sm">
                Join the {bookings} people who have already booked their spot
                for this event.
              </p>
            ) : (
              <p className="text-sm">
                Be the first to book your spot for this event.
              </p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>

        <Suspense fallback={<p>Loading similar events...</p>}>
          <SimilarEvents slug={slug} />
        </Suspense>
      </div>
    </section>
  );
};

export default EventDetailsPage;