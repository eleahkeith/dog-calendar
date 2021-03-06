//form rendered if no walk data is present

import { useState, useEffect } from "react";
import { formSchema } from "./UserValidation";

function Form(props) {
  const [walkTime, setWalkTime] = useState(" ");
  const [walkLength, setWalkLength] = useState("0");
  const [walkDogBehavior, setWalkDogBehavior] = useState("none");
  const [walkNotes, setWalkNotes] = useState(" ");

  function resetForm() {
    setWalkTime(" ");
    setWalkLength("0");
    setWalkDogBehavior(" ");
    setWalkNotes(" ");
  }

  useEffect(() => {
    var selectedWalkData = JSON.parse(
      localStorage.getItem(props.currentIsoDate)
    );

    if (selectedWalkData !== null) {
      setWalkTime(selectedWalkData["time"]);
      setWalkLength(selectedWalkData["length"]);
      setWalkDogBehavior(selectedWalkData["behavior"]);
      setWalkNotes(selectedWalkData["notes"]);
    } else {
      resetForm();
    }
  }, [props.currentIsoDate]);

  const handleSubmit = async (e) => {
    const isValid = await formSchema.isValid(singleWalkData());

    if (isValid) {
      storeWalkData();
      props.onHasChanged();
      props.onEdit();
    } else {
      window.alert(
        "One or more items you entered is invalid. Please check your form and submit again."
      );
    }
  };

  function singleWalkData() {
    var formData = {};
    formData.date = props.currentIsoDate;
    formData.length = walkLength;
    formData.time = walkTime;
    formData.behavior = walkDogBehavior;
    formData.notes = walkNotes;
    return formData;
  }

  function storeWalkData() {
    localStorage.setItem(
      props.currentIsoDate,
      JSON.stringify(singleWalkData())
    );
  }

  return (
    <section className="form-container">
      <form>
        <h2> Record Walk </h2>
        <label htmlFor="walkDate">
          Date
        </label>
        <input
          type="date"
          value={props.currentIsoDate}
          id="walkDate"
          name="walkDate"
          readOnly
        />
        <br />
        <label htmlFor="walkTime">
          Walk Time
        </label>
        <select
          name="walkTime"
          id="walkTime"
          onChange={(e) => setWalkTime(e.target.value)}
          value={walkTime}
        >
          <option hidden value=" ">
            --select one--
          </option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <br />
        <label htmlFor="walkLength">
          Length of Walk (minutes)
        </label>
        <input
          type="number"
          value={walkLength}
          onChange={(e) => setWalkLength(e.target.value)}
          id="walkLength"
          name="walkLength"
        />
        <br />
        <label htmlFor="walkDogBehavior">
          Dog Behavior
        </label>
        <select
          name="walkDogBehavior"
          id="walkDogBehavior"
          onChange={(e) => setWalkDogBehavior(e.target.value)}
          value={walkDogBehavior}
        >
          <option hidden value=" ">
            --select one--
          </option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
        <br />
        <label htmlFor="walkNotes">
          Walk Notes
        </label>
        <textarea
          id="walkNotes"
          name="walkNotes"
          value={walkNotes}
          onChange={(e) => setWalkNotes(e.target.value)}
        ></textarea>
        <br />
        <button
          type="button"
          key={props.onHasChanged}
          onClick={(e) => handleSubmit(e)}
        >Record Walk</button>
        <button
          type="button"
          onClick={(e) => resetForm()}
        >Reset Form</button>
      </form>
    </section>
  );
}

export default Form;
