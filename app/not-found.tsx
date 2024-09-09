import Main from '@/src/main/provider';
import UseNavigationButton from '@/src/navigate/provider';
import UseUrl from '@/src/url/provider';

export default function NotFound() {
  const title = 'Page Not Found';

  return (
    <Main title={title}>
      <p>
        The page that you are looking for,
        <UseUrl></UseUrl>, cannot be found.
      </p>
      <UseNavigationButton route={'back'}></UseNavigationButton>
      <UseNavigationButton route={'home'}></UseNavigationButton>
    </Main>
  );
}
