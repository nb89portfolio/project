import { DefinedError } from './defineError';

export type Data<Output> = [Output, null] | [null, DefinedError];
