import MainLayout from "../main/layout";

export default function LoadingFallback() {
  const title = "Page Loading";

  const content = (
    <p>The page you are looking for is currently loading. Please wait.</p>
  );

  return <MainLayout title={title} content={content}></MainLayout>;
}
