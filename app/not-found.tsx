import Main from '@/src/main/provider';
import UseNavigationButton from '@/src/navigate/provider';
import UseUrl from '@/src/url/provider';

export default function NotFound() {
  const title = 'Page Not Found';

  const preText = 'The page that you are looking for,';
  const postText = ', cannot be found.';

  return (
    <Main title={title}>
      <p>
        <UseUrl preText={preText} postText={postText}></UseUrl>
      </p>
      <UseNavigationButton route={'back'}></UseNavigationButton>
      <UseNavigationButton route={'home'}></UseNavigationButton>
    </Main>
  );
}
