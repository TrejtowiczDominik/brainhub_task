import { useState } from "react";

export const INPUT_TYPE_TEXT = "TEXT";
export const INPUT_TYPE_DATE = "DATE";

const useInput = (type, validateValue) => {
  const [enteredValue, setEnteredValue] = useState(
    type === INPUT_TYPE_TEXT ? "" : null
  );
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const dateBlurHandler = () => {
    setIsTouched(true);
  };

  const textBlurHandler = () => {
    setIsTouched(true);
  };

  const textChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const dateChangedHandler = (date) => {
    setEnteredValue(date);
  };

  const reset = () => {
    setEnteredValue(type === INPUT_TYPE_TEXT ? "" : null);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangedHandler:
      type === INPUT_TYPE_TEXT ? textChangedHandler : dateChangedHandler,
    inputBlurHandler:
      type === INPUT_TYPE_TEXT ? textBlurHandler : dateBlurHandler,
    reset,
  };
};

export default useInput;
