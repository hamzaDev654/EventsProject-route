// import React, { Fragment } from "react";
// import basketball from "../../src/assets/basketball.png";
// import volleyball from "../../src/assets/volleyball.png";
// import football from "../../src/assets/football.png";
// import hockey from "../../src/assets/hockey.webp";
// import EventsList from "../components/EventsList";
// const DUMMY_EVENTS = [
//   { id: "e1", image: basketball, title: "Basketball", date: "12-06-2022" },
//   { id: "e2", image: volleyball, title: "Volleyball", date: "13-06-2022" },
//   { id: "e3", image: football, title: "Football", date: "1-04-2022" },
//   { id: "e4", image: hockey, title: "Hockey", date: "3-03-2022" },
// ];

// export const EventsPage = () => {
//   return (
//     <Fragment>
//       <EventsList events={DUMMY_EVENTS} />
//     </Fragment>
//   );
// };

// import { useEffect, useState } from 'react';

// import EventsList from '../components/EventsList';

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8080/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;

import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

const EventsPage = () => {
  // const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;
  // return <EventsList events={events} />;
  // return <EventsList />;

  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fecth events" }, { status: 500 });
    // throw new Response(JSON.stringify({ message: "Could not fecth events" }), {
    //   status: 500,
    // });
    // throw {message: "Could not fecth events"}
    // return { isError: true, message: "Could not fecth events" };
    // setError('Fetching events failed.');
  } else {
    const resData = await response.json();
    return resData.events;
    // const res = new Response(resData.events, { status: 201 });
    // return response;
    // setFetchedEvents(resData.events);

  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
