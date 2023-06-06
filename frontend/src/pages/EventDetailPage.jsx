import React, { Fragment, Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
export const EventDetailPage = () => {
  // const parms = useParams();
  // const data = useRouteLoaderData("event-detail");
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <Fragment>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

const loadedEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details Page for Selected Events !" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

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

export const loader = async ({ request, params }) => {
  const id = params.id;
  return defer({
    event: await loadedEvent(id),
    events: loadEvents(),
  });
};

export const action = async ({ params, request }) => {
  const eventId = params.id;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw json(
      { message: "Could not Delete Events !" },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
};
