
import UseNavigationButton from '../navigate/provider';


export default function LoadingFallback() {
  return (
    <main>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>

      <UseNavigationButton route='refresh'></UseNavigationButton>
      <UseNavigationButton route='back'></UseNavigationButton>
      <UseNavigationButton route='home'></UseNavigationButton>

    </main>
  );
}
