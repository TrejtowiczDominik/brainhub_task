import React, { useState } from "react";
import axios from "axios";
import DataPicker from "react-datepicker";

import useInput, {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_DATE,
} from "../../hooks/use-input";

import "./EventForm.css";
import "react-datepicker/dist/react-datepicker.css";

const getInputClasses = (inputHasError) => {
  return `formGroup ${inputHasError ? "invalid" : ""}`;
};

const EventForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    inputBlurHandler: enteredFirstNameBlurHandler,
    valueChangedHandler: enteredFirstNameChangedHandler,
    reset: enteredFirstNameReset,
  } = useInput(
    INPUT_TYPE_TEXT,
    (value) => value !== null && value.trim() !== ""
  );

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    inputBlurHandler: enteredLastNameBlurHandler,
    valueChangedHandler: enteredLastNameChangedHandler,
    reset: enteredLastNameReset,
  } = useInput(
    INPUT_TYPE_TEXT,
    (value) => value !== null && value.trim() !== ""
  );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    inputBlurHandler: enteredEmailBlurHandler,
    valueChangedHandler: enteredEmailChangedHandler,
    reset: enteredEmailReset,
  } = useInput(
    INPUT_TYPE_TEXT,
    (value) =>
      value !== null && value.trim() !== "" && /\S+@\S+\.\S+/.test(value)
  );

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: enteredDateHasError,
    inputBlurHandler: enteredDateBlurHandler,
    valueChangedHandler: enteredDateChangedHandler,
    reset: enteredDateReset,
  } = useInput(INPUT_TYPE_DATE, (date) => date !== null);

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredDateIsValid
  ) {
    formIsValid = true;
  }

  const resetInputs = () => {
    enteredFirstNameReset();
    enteredLastNameReset();
    enteredEmailReset();
    enteredDateReset();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setIsSubmitting(true);
    setMessage({
      text: "",
      error: false,
    });
    const newEvent = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      // eventDate: enteredDate.getTime(),
    };

    axios({
      url: "/add-event",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        event: newEvent,
      },
    })
      .then((result) => {
        setMessage({
          text: result.data.message,
          error: false,
        });
        resetInputs();
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          text: err.response.data.message,
          error: true,
        });
      });
    setIsSubmitting(false);
    setTimeout(() => {
      setMessage({
        text: "",
        error: false,
      });
    }, 3000);
  };

  return (
    <React.Fragment>
      <div className="eventContainer">
        <div className="eventWrapper">
          <form>
            <div className={getInputClasses(enteredFirstNameHasError)}>
              <label htmlFor="firstName">Your first name</label>
              <input
                type="text"
                id="firstName"
                value={enteredFirstName}
                onBlur={enteredFirstNameBlurHandler}
                onChange={enteredFirstNameChangedHandler}
              />
              {enteredFirstNameHasError && <p>Please enter your first name</p>}
            </div>
            <div className={getInputClasses(enteredLastNameHasError)}>
              <label htmlFor="lastName">Your last name</label>
              <input
                type="text"
                id="lastName"
                value={enteredLastName}
                onBlur={enteredLastNameBlurHandler}
                onChange={enteredLastNameChangedHandler}
              />
              {enteredLastNameHasError && <p>Please enter your last name</p>}
            </div>
            <div className={getInputClasses(enteredEmailHasError)}>
              <label htmlFor="email">Your e-mail</label>
              <input
                type="text"
                id="email"
                value={enteredEmail}
                onBlur={enteredEmailBlurHandler}
                onChange={enteredEmailChangedHandler}
              />
              {enteredEmailHasError && (
                <p>Please enter correct e-mail address</p>
              )}
            </div>
            <div className={getInputClasses(enteredDateHasError)}>
              <label htmlFor="eventDate">Event date</label>
              <DataPicker
                selected={enteredDate}
                onChange={enteredDateChangedHandler}
                onBlur={enteredDateBlurHandler}
                id="eventDate"
              />
              {enteredDateHasError && <p>Please select date</p>}
            </div>
            {isSubmitting && <p>Sending data...</p>}
            {!isSubmitting && (
              <button
                type="button"
                className="submitBtn"
                disabled={!formIsValid}
                onClick={onSubmitHandler}
              >
                Submit
              </button>
            )}
          </form>
          {message.text && (
            <div
              className="messageContainer"
              data-testid="_testMssageContainer"
            >
              {message.error && (
                <p id="errorMsg" className="errorMessage">
                  {message.text}
                </p>
              )}
              {!message.error && (
                <p id="successMsg" className="successMessage">
                  {message.text}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventForm;
