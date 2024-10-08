import Logo from './logo';
import NavigationLinks from './navigation';
import { HeaderUrl } from './url';

export function Header({}: {}) {
  return (
    <header>
      <Logo></Logo>
      <HeaderUrl></HeaderUrl>
      <NavigationLinks></NavigationLinks>
    </header>
  );
}
