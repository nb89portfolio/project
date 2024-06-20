"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";

type ValidationInputInputSetState = Dispatch<
  SetStateAction<{
    [key: string]: {
      value: string;
      [key: string]: any;
    };
  }>
>;

type ValidationInputInputProps = {
  name: string;
  type: "email" | "password" | "text";
  placeholder: string;
  setState: ValidationInputInputSetState;
};

function onChange(
  event: FormEvent<HTMLInputElement>,
  setState: ValidationInputInputSetState
) {
  const { name, value } = event.currentTarget;

  setState((previouState) => {
    return {
      ...previouState,
      [name]: {
        ...previouState[name],
        value,
      },
    };
  });
}

export default function ValidationInputInput({
  name,
  type,
  placeholder,
  setState,
}: ValidationInputInputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={(event) => onChange(event, setState)}
    ></input>
  );
}
