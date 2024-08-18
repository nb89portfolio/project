import LoadingRefresh from "../refresh";

export default function LoadingFallback() {
  return (
    <main>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>
      <LoadingRefresh></LoadingRefresh>
    </main>
  );
}
