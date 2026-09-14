import { Link } from "react-router";

export default function NavBar() {
  return (
    <>
      <Link to={"/shop"}>Shop</Link>
      <Link to={"/home"}>Home</Link>
    </>
  );
}
