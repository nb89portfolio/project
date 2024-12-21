const entryPoint = 'app';

function loadApp(entryPoint) {
  const app = document.getElementById(entryPoint);

  const createParagraph = document.createElement('p');

  const replacementText = 'Client html page scripted.';

  createParagraph.textContent = replacementText;

  console.log(createParagraph);

  app.replaceChildren(createParagraph);
}

loadApp(entryPoint);
