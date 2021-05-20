import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import formatISO from "date-fns/formatISO";

import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";
import pawprint from "../images/paw-print.png";

function Calendar(props) {
  // start header with month, year, arrows
  function monthYear() {
    const dateFormat = "MMMM yyyy";

    // might need to move this outside of header function later
    function nextMonth() {
      props.setCurrentDate(addMonths(props.currentDate, 1));
    }

    function prevMonth() {
      props.setCurrentDate(subMonths(props.currentDate, 1));
    }
    // might need to move this outside of header function later

    return (
      <div className="month-year">
        <img
          className="arrow"
          onClick={prevMonth}
          src={leftArrow}
          alt="left arrow"
        ></img>
        <div className="month">{format(props.currentDate, dateFormat)}</div>
        <img
          className="arrow"
          onClick={nextMonth}
          src={rightArrow}
          alt="right arrow"
        ></img>
      </div>
    );
  }
  //end header with month, year, arrows

  // start column headers to display day of week
  function daysOfWeek() {
    const dateFormat = "EEEEEE";

    var days = [];
    var startDate = startOfWeek(props.currentDate);

    for (var i = 0; i < 7; i++) {
      days.push(
        <div className="single-day-name" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="day-names">{days}</div>;
  }
  //end column headers to display day of week

  //start generation of individual date cells
  function cells() {
    const monthStart = startOfMonth(props.currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "dd";
    const rows = [];

    //turn date into ISO format. use localStorage.getItem to determine if key exists. If key does not exist, return false, else return true
    function doesWalkExist(day) {
      var formattedDate = formatISO(day, { representation: "date" });

      if (localStorage.getItem(formattedDate) === null) {
        return false;
      } else {
        return true;
      }
    }

    var days = [];
    var day = startDate;
    var formattedDate = "";

    while (day <= endDate) {
      for (var i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        //creates each date in the 7-day week
        days.push(
          <div
            className={`date-normal ${
              !isSameMonth(day, monthStart)
                ? "date-disabled"
                : isSameDay(day, props.selectedDate)
                ? "date-selected"
                : ""
            }`}
            key={day}
            onClick={() => props.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <img
              className={`pawprint-normal ${
                !doesWalkExist(day)
                  ? "pawprint-invisible"
                  : doesWalkExist(day)
                  ? "pawprint-visible"
                  : ""
              }`}
              key={day}
              src={pawprint}
              alt="pawprint"
            />
          </div>
        );
        day = addDays(day, 1);
      }

      //pushes each row of 7 dates created above into the calendar
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }

    return <div className="date-grid">{rows}</div>;
  }

  // functions that are called in the form

  return (
    <div className="calendar">
      <div className="month-year">{monthYear()}</div>
      <div className="days">{daysOfWeek()}</div>
      <div className="cells">{cells()}</div>
    </div>
  );
}

export default Calendar;
