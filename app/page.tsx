import UseMain from '@/src/main/provider';

export default async function Home() {
  const title = 'Home Page';

  throw new Error();

  return (
    <UseMain title={title}>
      <p>This is the home page.</p>
    </UseMain>
  );
}
