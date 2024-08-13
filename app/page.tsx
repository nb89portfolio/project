import Main from "@/src/components/main/component";

export default function Home() {
  const title = "home page";
  const content = <p>home page</p>;

  return <Main title={title} content={content}></Main>;
}
