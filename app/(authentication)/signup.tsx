"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  AuthenticationFieldset,
  AuthenticationForm,
  AuthenticationState,
} from "./types";

const signUpFieldset: AuthenticationFieldset = {
  email: {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    validation:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    prompts: "Enter a valid email address.",
  },
  password: {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your desired password",
    validation: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    prompts:
      "Enter a passwrod from 6 to 16 characters including one lower case, one higher case, and 1 special symbole.",
  },
  confirmation: {
    label: "Confirmation",
    name: "confirmation",
    type: "string",
    placeholder: "Reenter your password",
    validation: /^$/,
    prompts: "Reenter your desired password.",
  },
};

function buildState(fieldset: AuthenticationFieldset) {
  const array = Object.values(fieldset);

  const stateFields = array.map((element) => {
    return {
      [element.name]: "",
    };
  });

  return stateFields.reduce(
    (resault, current) => Object.assign(resault, current),
    {}
  );
}

const initialState: AuthenticationState = buildState(signUpFieldset);

function updateState(
  event: FormEvent<HTMLInputElement>,
  setFieldState: Dispatch<SetStateAction<AuthenticationState>>
) {
  const { name, value } = event.currentTarget;

  setFieldState((previousState) => {
    return { ...previousState, [name]: value };
  });
}

function buildFieldset(
  fieldset: AuthenticationFieldset,
  fieldState: AuthenticationState,
  setFieldState: Dispatch<SetStateAction<AuthenticationState>>
) {
  const array = Object.values(fieldset);

  const elements = array.map((field) => {
    const { label, name, type, placeholder, validation, prompts } = field;
    const state = fieldState[name];

    const isConfirmation = name === "confirmation";

    const isPasswordsValid = state === fieldState["password"];

    const isValid = isConfirmation ? isPasswordsValid : validation.test(state);

    const prompt = isValid ? "" : prompts;

    return (
      <>
        <span key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(event) => updateState(event, setFieldState)}
          ></input>
        </span>
        <output htmlFor={name}>{prompt}</output>
      </>
    );
  });

  return elements;
}

const initialFormState: AuthenticationForm = {
  formValid: false,
  fieldsetDisabled: false,
};

export default function Signup() {
  const [fieldState, setFieldState] =
    useState<AuthenticationState>(initialState);

  const fieldset = buildFieldset(signUpFieldset, fieldState, setFieldState);

  return (
    <main>
      <form>
        <h2>Sign Up</h2>
        <fieldset>{fieldset}</fieldset>
        <button>Sign Up</button>
      </form>
    </main>
  );
}
