import React, { Fragment } from 'react'
import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom'

export const EventsRootLayout = () => {
  return (
    <Fragment>
        <EventsNavigation/>
        <Outlet/>
    </Fragment>
  )
}
