import NavigationButton from "../navigate/component";

export default function LoadingFallback() {
  return (
    <main>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>
      <NavigationButton route="refresh"></NavigationButton>
      <NavigationButton route="back"></NavigationButton>
      <NavigationButton route="home"></NavigationButton>
    </main>
  );
}
