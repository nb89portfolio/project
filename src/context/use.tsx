import { Context, useContext } from 'react';
import { StateAction } from './types';

function UseContext<Type>({
  Context,
}: {
  Context: Context<StateAction<Type>>;
}) {
  return useContext(Context);
}

export default UseContext;
