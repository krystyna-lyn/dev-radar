import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) =>
(<div className="flex gap-2">
  <Image src={icon} alt={alt} width={17} height={17} />
  <p>{label}</p>
</div>
)


const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  if (!request.ok) {
    return notFound();
  }
  const { event } = await request.json();

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
  } = event;


  return (
    <section id="event">
      <div className="header">
        <h1> Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/* Left side - Event details */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailsItem icon="/icons/calendar.svg" alt="calendar" label={date} />
            <EventDetailsItem icon="/icons/clock.svg" alt="calendar" label={time} />
            <EventDetailsItem icon="/icons/pin.svg" alt="location" label={location} />
            <EventDetailsItem icon="/icons/mode.svg" alt="calendar" label={mode} />
            <EventDetailsItem icon="/icons/audience.svg" alt="calendar" label={audience} />

          </section>


        </div>
        {/* Right side - Booking form */}
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section >
  )
}

export default EventDetailsPage
