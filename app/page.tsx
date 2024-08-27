import Main from "@/src/main/component";

export default async function Home() {
  const title = "Home Page";

  throw new Error();

  return (
    <Main title={title}>
      <p>This is the home page.</p>
    </Main>
  );
}
