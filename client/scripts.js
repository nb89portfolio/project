function domTest() {
  const currentApp = document.getElementById('app');

  console.log(currentApp);

  if (currentApp) {
    const newContentDiv = document.createElement('div');
    newContentDiv.setAttribute('id', 'app');
    newContentDiv.innerHTML = '<h1>New Content</h1>';

    currentApp.parentNode.replaceChild(newContentDiv, currentApp);
  }
}

domTest();
