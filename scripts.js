const entryPoint = 'app';

const app = document.getElementById(entryPoint);

const replacementNode = <p>"Client html page with script."</p>;

const operation = app.replaceChildren(<p></p>);
