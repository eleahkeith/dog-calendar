//walk card rendered if data exists

function WalkCard(props) {
  var existingWalkData = JSON.parse(localStorage.getItem(props.currentIsoDate));

  function handleDelete(e) {
    localStorage.removeItem(props.currentIsoDate);
    props.onHasChanged();
    props.onEdit();
  }

  return (
    <>
      {existingWalkData ? (
        <div className="form">
          <form>
            <div className="sub-header"> Walk Details </div>
            <br />
            <label className="form-label" htmlFor="walkDate">
          Date
        </label>
        <input
          className="form-input"
          type="date"
          value={props.currentIsoDate}
          id="walkDate"
          name="walkDate"
          readOnly
        />
            <br />
            <span className="form-label">Walk Time</span>
            <span className="existing-walk-input">{existingWalkData.time}</span>
            <br />
            <span className="form-label">Length of Walk (minutes)</span>
            <span className="existing-walk-input"> {existingWalkData.length}</span>
            <br />
            <span className="form-label">Dog Behavior</span>
            <span className="existing-walk-input"> {existingWalkData.behavior}</span>
            <br />
            <span className="form-label">Walk Notes</span>
            <span className="existing-input-box"> {existingWalkData.notes}</span>
            <br />
            <input
              className="button"
              type="button"
              value="Delete Walk"
              key={props.onHasChanged}
              onClick={(e) => handleDelete(e)}
            />
            <button
              className="button"
              type="button"
              // key={props.onHasChanged}
              onClick={() => props.onEdit()}
            >Edit Walk</button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default WalkCard;
