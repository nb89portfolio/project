import Main from "@/src/main/component";
import NavigationButton from "@/src/navigate/component";
import UrlText from "@/src/url/component";

export default function NotFound() {
  const title = "Page Not Found";

  const preText = "The page that you are looking for,";
  const postText = ", cannot be found.";

  return (
    <Main title={title}>
      <p>
        <UrlText preText={preText} postText={postText}></UrlText>
      </p>
      <NavigationButton route={"back"}></NavigationButton>
      <NavigationButton route={"home"}></NavigationButton>
    </Main>
  );
}
