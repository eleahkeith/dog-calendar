import "./styles/App.css";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Calendar from "./components/Calendar.js";
import WalkCard from "./components/Walk-card.js";
import Footer from "./components/Footer.js"
import { useState, useEffect } from "react";

import toDate from "date-fns/toDate";
import formatISO from "date-fns/formatISO";
import backgroundImage from "./images/paw-print-background.png";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasChanged, setHasChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const currentIsoDate = formatISO(selectedDate, { representation: "date" });

  const onHasChanged = () => {
    setHasChanged(!hasChanged);
  };

  useEffect( () => {
    if (doesWalkExist()) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const onDateClick = (day) => {
    setSelectedDate(toDate(day));
    console.log(selectedDate);
  };

  const doesWalkExist = (day) => {
    if (localStorage.getItem(currentIsoDate) === null) {
      return false;
    } else {
      return true;
    }
  };

  const onEdit = (day) => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <img
        className="background-image"
        alt="background pawprint"
        src={backgroundImage}
      />
      <main key={hasChanged}>
        <Header className="header"></Header>
        <Calendar
          className="calendar"
          selectedDate={selectedDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDateClick={onDateClick}
          onHasChanged={onHasChanged}
        ></Calendar>{" "}
        {isEditing ? (
          <Form
            className="form"
            selectedDate={selectedDate}
            currentDate={currentDate}
            currentIsoDate={currentIsoDate}
            setCurrentDate={setCurrentDate}
            setSelectedDate={setSelectedDate}
            onDateClick={onDateClick}
            onHasChanged={onHasChanged}
            onEdit={onEdit}
          ></Form>
        ) : (
          <WalkCard
            selectedDate={selectedDate}
            currentDate={currentDate}
            currentIsoDate={currentIsoDate}
            setCurrentDate={setCurrentDate}
            onDateClick={onDateClick}
            onHasChanged={onHasChanged}
            onEdit={onEdit}
            doesWalkExist={doesWalkExist}
          ></WalkCard>
        )}
        <Footer></Footer>
      </main>
    </>
  );
}

export default App;
