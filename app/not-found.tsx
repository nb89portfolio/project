import Main from '@/src/main/component';
import NavigationButton from '@/src/navigate/component';
import UseUrl from '@/src/url/component';

export default function NotFound() {
  const title = 'Page Not Found';

  const preText = 'The page that you are looking for,';
  const postText = ', cannot be found.';

  return (
    <Main title={title}>
      <p>
        <UseUrl preText={preText} postText={postText}></UseUrl>
      </p>
      <NavigationButton route={'back'}></NavigationButton>
      <NavigationButton route={'home'}></NavigationButton>
    </Main>
  );
}
