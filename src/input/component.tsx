"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ValidationInputOutput from "./output/component";

type InputPropsValidation = {
  test: RegExp | string;
  prompt: string;
};

export type inputFormValidation = (
  name: string,
  value: string,
  isValid: boolean
) => void;

type InputProps = {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  validation: InputPropsValidation;
  formValidate: inputFormValidation;
};

type InputState = {
  isValid: boolean;
  output: string;
};

function onChange(
  event: FormEvent<HTMLInputElement>,
  validation: InputPropsValidation,
  setState: Dispatch<SetStateAction<InputState>>,
  formValidate: inputFormValidation
) {
  const { name, value } = event.currentTarget;

  const { test, prompt } = validation;

  const isTextValidation = typeof test === "string";

  const isValid = isTextValidation ? value === test : test.test(value);

  const output = isValid ? "" : prompt;

  setState({
    isValid,
    output,
  });

  formValidate(name, value, isValid);
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  validation,
  formValidate,
}: InputProps) {
  const [state, setState] = useState<InputState>({
    isValid: false,
    output: "",
  });

  return (
    <div>
      <span>
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event, validation, setState, formValidate)
          }
        ></input>
      </span>
    </div>
  );
}
