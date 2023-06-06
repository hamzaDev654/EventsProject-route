import React, { Fragment } from "react";
import EventForm from "../components/EventForm";

export const NewEventPage = () => {
  return (
    <Fragment>
      <EventForm method={'POST'} />
    </Fragment>
  );
};


