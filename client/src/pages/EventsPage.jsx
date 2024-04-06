import React from 'react';
import Header from '../components/layout/Header';
import EventCard from '../components/event/EventCard';
import Footer from '../components/layout/Footer';
import { useSelector } from 'react-redux';

const EventsPage = () => {
  const { event } = useSelector((state) => state.event);

  return (
    <>
      <Header activateHeaderact={4} />
      <div className="container py-16">
        {event?.map((event) => (
          <EventCard event={event} key={event.key} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
