import React, { Fragment } from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
export const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  return (
    <Fragment>
      <EventForm event={data.event} method={"PATCH"} />
    </Fragment>
  );
};
