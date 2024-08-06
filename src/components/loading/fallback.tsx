import Main from "../main/component";

export default function Fallback() {
  const title = "Page Loading";

  const content = (
    <p>The page you are looking for is currently loading. Please wait.</p>
  );

  return <Main title={title} content={content}></Main>;
}
