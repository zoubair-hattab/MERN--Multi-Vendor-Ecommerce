import React from 'react';
import EventCard from './EventCard';
import { useSelector } from 'react-redux';

const Event = () => {
  const { event } = useSelector((state) => state.event);
  //console.log(event);
  return (
    <div className="container py-4 ">
      <h2 className="font-semibold text-2xl mb-6">Popular Event</h2>
      {event?.map((event) => (
        <EventCard event={event} key={event.key} />
      ))}
    </div>
  );
};

export default Event;
