# Dev Radar

Dev Radar is a full-stack web application for discovering developer events such as conferences, meetups, and hackathons.

The application allows users to browse events, view detailed event information, discover similar events, and book a spot.

## Features

- Browse developer events
- View detailed event information
- Explore similar events based on tags
- Book a spot for an event
- Upload event images to Cloudinary
- Store and retrieve event data using MongoDB
- Dynamic event pages using slugs
- Responsive UI

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Cloudinary
- Next.js Server Components
- Server Functions
- REST API
- Git

## Architecture

The application uses Next.js App Router.

Event data is stored in MongoDB and accessed through Mongoose.

The application uses Next.js Route Handlers for the event API:

- `GET /api/events` — fetch all events
- `GET /api/events/[slug]` — fetch a single event

Dynamic routes are used for event details:

- `/events/[slug]`

Server-side logic is used for retrieving similar events based on shared tags.

Cloudinary is used for storing event images.

## Project Structure

```text
app/
├── api/
│   └── events/
│       ├── route.ts
│       └── [slug]/
│           └── route.ts
├── events/
│   └── [slug]/
│       └── page.tsx
├── about/
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── EventCard.tsx
├── EventDetails.tsx
├── BookEvent.tsx
├── ExploreBtn.tsx
└── ...

database/
├── event.model.ts
└── booking.model.ts

lib/
├── mongodb.ts
└── actions/
    └── event.actions.ts

### Event API

Implemented REST API endpoints using Next.js Route Handlers for retrieving event collections and individual events by slug.

### MongoDB Integration

Implemented MongoDB connection management with Mongoose and created schemas for events and bookings.

### Dynamic Event Pages

Implemented dynamic routes using Next.js App Router:

`/events/[slug]`

### Similar Events

Implemented server-side MongoDB queries to find events sharing tags with the current event.

### Image Management

Integrated Cloudinary for uploading and storing event images.

### Booking System

Implemented event booking functionality with a MongoDB booking model and event references.

What I Practiced

This project was built to practice full-stack development with the modern Next.js App Router architecture.

Frontend
Building reusable React components
Server Components and Client Components
Dynamic routes
Responsive layouts with Tailwind CSS
TypeScript interfaces and type-safe props
Next.js Image optimization
Backend
Building REST APIs with Next.js Route Handlers
Handling GET and POST requests
Processing multipart form data
Server-side database operations
Server Functions
Input validation
Error handling
Database
MongoDB integration
Mongoose schemas and models
ObjectId relationships
Querying documents
Filtering with MongoDB operators
Unique indexes
Timestamps
Using .lean() for read queries
External Services
MongoDB Atlas
Cloudinary image uploads
Environment variable configuration
Next.js
App Router
Dynamic segments
Server Components
Server Functions
Cache Components
cacheLife
Route Handlers
next/image
Key Technical Implementations
Dynamic routing

Event pages use a dynamic route:

app/events/[slug]/page.tsx

This allows every event to have its own URL based on its slug.

REST API

The project uses Next.js Route Handlers instead of a separate backend server.

app/api/events/route.ts
app/api/events/[slug]/route.ts
MongoDB with Mongoose

Database access is centralized through a reusable MongoDB connection and Mongoose models.

Similar event queries

Similar events are calculated from shared tags using MongoDB query operators.

Current event
      ↓
Extract tags
      ↓
Find events containing matching tags
      ↓
Exclude current event
      ↓
Return similar events
Cloudinary integration

Images are uploaded to Cloudinary through the API.

The resulting secure_url is saved with the event document.

Booking relationships

Bookings reference events using MongoDB ObjectId relationships:

Event
  │
  └── _id
       ↑
       │
   Booking.eventId
Future Improvements

Possible future improvements include:

User authentication
Event search
Event filtering by tags
Pagination
Event creation dashboard
Booking management
Email confirmation
Improved validation
Automated tests
Deployment and production monitoring
Project Status

The core event discovery, event details, similar events, image upload, API, database, and booking functionality are implemented.

The project is primarily intended as a full-stack portfolio project demonstrating modern Next.js development and backend integration.

Author

Krystyna

Frontend / Full-Stack Developer

Technologies: Next.js · React · TypeScript · MongoDB · Mongoose · Tailwind CSS · Cloudinary
```
