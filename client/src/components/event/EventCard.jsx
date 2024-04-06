import React from 'react';
import CountDown from './CountDown';
import { backend_url } from '../../server';

const EventCard = ({ event }) => {
  return (
    <div className="flex items-center gap-8 bg-white p-3 flex-wrap md:flex-nowrap rounded-md">
      <img
        src={`${backend_url}${event.images[0]}`}
        alt=""
        className="w-[50%]md:w-[35%] h-[300px] object-contain mx-auto"
      />
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-xl ">{event?.name}</h3>
        <p className="leading-6">{event?.description}</p>
        <div className="flex item-center justify-between">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-xl">{event?.originalPrice}</p>
            <p className="font-semibold text-red-500 text-xl  -mt-4 line-through">
              {event?.discountPrice}
            </p>
          </div>
          <p className="text-teal-500 font-semibold">sold</p>
        </div>
        <CountDown date={event?.Finish_Date} />
      </div>
    </div>
  );
};

export default EventCard;
