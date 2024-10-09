'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type Form = { isValid: boolean };

type Prompt = {
  success: String;
  error: String;
};

type FieldAttributes = {
  name: string;
  type: 'email' | 'password';
  placeholder: string;
  validator: RegExp | string;
  prompt: Prompt;
};

type FieldsAttributes = {
  email: FieldAttributes;
  password: FieldAttributes;
  confirmation: FieldAttributes;
};

type FieldState = {
  value: string;
  output: string;
};

type FieldsStates = {
  email: FieldState;
  password: FieldState;
  confirmation: FieldState;
};

const fieldsAttributes: FieldsAttributes = {
  email: {
    name: 'email',
    type: 'email',
    placeholder: 'Please enter a valid email.',
    validator:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    prompt: {
      success: 'Email is valid.',
      error: 'Please enter a valid email address.',
    },
  },
  password: {
    name: 'password',
    type: 'password',
    placeholder: 'Please enter a valid email.',
    validator:
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
    prompt: {
      success: 'Password is valid.',
      error: 'Please enter a valid password.',
    },
  },
  confirmation: {
    name: 'confirmation',
    type: 'password',
    placeholder: 'Please reenter your password.',
    validator: '',
    prompt: {
      success: 'Password is valid.',
      error: 'Please reenter a valid password.',
    },
  },
};

const initialFieldState: FieldState = {
  value: '',
  output: '',
};

function updateInput(
  event: FormEvent<HTMLInputElement>,
  validator: RegExp | string,
  prompt: Prompt,
  setState: Dispatch<SetStateAction<FieldsStates>>
) {
  const { name, value } = event.currentTarget;

  const isStringValidator = typeof validator === 'string';

  const isValid = isStringValidator
    ? value === validator
    : validator.test(value);

  const output = isValid ? prompt.success : prompt.error;

  setState((previousState) => {
    return {
      ...previousState,
      [name]: {
        value,
        output,
      },
    };
  });
}

function Input({
  attributes,
  state,
  setState,
}: {
  attributes: FieldAttributes;
  state: FieldState;
  setState: Dispatch<SetStateAction<FieldsStates>>;
}) {
  const { name, type, placeholder, validator, prompt } = attributes;

  const { output } = state;

  return (
    <div>
      <span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(event) =>
            updateInput(event, validator, prompt, setState)
          }></input>
      </span>
      <output>{output}</output>
    </div>
  );
}

function buildInputs(
  fieldsAttributes: FieldsAttributes,
  fieldsState: FieldsStates,
  setFields: Dispatch<SetStateAction<FieldsStates>>
) {
  const inputs = Object.entries(fieldsAttributes).map(([key, attributes]) => {
    const state = fieldsState[key as keyof FieldsStates];

    const isConfirmation = (key as keyof FieldsStates) === 'confirmation';

    const newAttributes = isConfirmation
      ? { ...attributes, validator: fieldsState['password'].value }
      : attributes;

    return (
      <Input
        attributes={newAttributes}
        state={state}
        setState={setFields}></Input>
    );
  });

  return <>{inputs}</>;
}

function buildInitialState(fieldsAttributes: FieldsAttributes) {
  const state = Object.keys(fieldsAttributes)
    .map((key) => {
      return key;
    })
    .reduce((accumulator, key) => {
      accumulator[key as keyof FieldsStates] = initialFieldState;

      return accumulator;
    }, {} as FieldsStates);

  return state;
}

export default function SignUp() {
  const [form, setForm] = useState<Form>({ isValid: false });

  const [fields, setFields] = useState<FieldsStates>(
    buildInitialState(fieldsAttributes)
  );

  return (
    <main>
      <h2>Sign Up</h2>
      <form>
        <fieldset>{buildInputs(fieldsAttributes, fields, setFields)}</fieldset>
        <button>Sign Up</button>
      </form>
    </main>
  );
}
