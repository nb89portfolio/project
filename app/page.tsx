import MainLayout from "@/src/components/main/layout";

export default function Home() {
  const title = "home page";
  const content = <p>home page</p>;

  return <MainLayout title={title} content={content}></MainLayout>;
}
