const id = 'app';

function dom({ id }: { id: string }) {
  const currentNode = document.getElementById(id);

  const isNull = currentNode === null;

  if (isNull) {
    throw new Error();
  }
}
