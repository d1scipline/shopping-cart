import { Link, useOutletContext } from "react-router";

export default function Shop() {
  const { data } = useOutletContext();

  return (
    <>
      <h1>Shop</h1>
      <ul>
        {data?.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </>
  );
}
