import React, { useState } from "react";
import EventContext from "./EventContext";

const EventState = (props) => {
  const host = "http://localhost:5000"; // backend URL
  const [events, setEvents] = useState([]);

  // ✅ Get all events
  const getEvents = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setEvents([]); // if user logged out, clear events
        return;
      }

      const response = await fetch(`${host}/api/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        const formatted = data.map((ev) => ({
          id: ev._id, // always use id for FullCalendar
          title: ev.title,
          start: ev.start,
          end: ev.end,
          allDay: ev.allDay,
        }));
        setEvents(formatted);
      } else {
        setEvents([]); // fallback for error responses
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    }
  };

  // ✅ Add event
  const addEvent = async (title, start, end, allDay) => {
    const response = await fetch(`${host}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, start, end, allDay }),
    });

    const ev = await response.json();

    // format for calendar
    const formatted = {
      id: ev._id,
      title: ev.title,
      start: ev.start,
      end: ev.end,
      allDay: ev.allDay,
    };

    setEvents((prev) => [...prev, formatted]);
  };

  // ✅ Delete event
  const deleteEvent = async (id) => {
    await fetch(`${host}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  // ✅ Update event
  const updateEvent = async (id, title, start, end, allDay) => {
    const response = await fetch(`${host}/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, start, end, allDay }),
    });

    const updated = await response.json();

    const formatted = {
      id: updated._id,
      title: updated.title,
      start: updated.start,
      end: updated.end,
      allDay: updated.allDay,
    };

    setEvents((prev) =>
      prev.map((event) => (event.id === id ? formatted : event))
    );
  };

  return (
    <EventContext.Provider
      value={{ events, getEvents, addEvent, deleteEvent, updateEvent }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
