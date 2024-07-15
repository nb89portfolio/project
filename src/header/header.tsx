import Nav from "./nav";
import Title from "./title";

type Props = {};

export default function Header({}: Props) {
  return (
    <header>
      <Title></Title>
      <Nav></Nav>
    </header>
  );
}
