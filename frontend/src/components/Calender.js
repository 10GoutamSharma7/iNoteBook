import React, { useContext, useEffect, useState } from "react";
import EventContext from "../context/events/EventContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style/Calendar.css"; // <-- add CSS from below

export default function Calendar() {
  const { events, getEvents, addEvent, deleteEvent } = useContext(EventContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  // When a date is selected
  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (title.trim()) {
      addEvent(title, selectedInfo.startStr, selectedInfo.endStr, selectedInfo.allDay);
    }
    setTitle("");
    setShowAddModal(false);
    selectedInfo.view.calendar.unselect();
  };

  // When an event is clicked
  const handleEventClick = (clickInfo) => {
    setEventToDelete(clickInfo);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteEvent(eventToDelete.event.id);
    eventToDelete.event.remove();
    setShowDeleteModal(false);
  };

  return (
    <div className="cute-calendar-container">
      <h1 className="calendar-title">🌸 Calendar 🌸</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="90vh"
      />

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Event</h2>
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button className="cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Delete Event?</h2>
            <p>Are you sure you want to delete <b>{eventToDelete.event.title}</b>?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button className="cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




