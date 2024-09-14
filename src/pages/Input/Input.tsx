import classNames from "classnames";
import style from "./Input.module.css";

const fetchData = async () => {
  const response = await fetch("http://localhost:3005/foo");
  console.log(response);
};

fetchData();

export default function Input() {
  return (
    <>
      <div>
        <h1>Hanzi</h1>
      </div>
    </>
  );
}
