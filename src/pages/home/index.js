import { useEffect, useState } from "react";
import "./index.scss";
import Button from "../../components/button";
import { readAllData } from "../../api/list";
export default function Home() {
  const [listPrice, setListPrice] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await readAllData();
      const filtered = data.filter(el => el.uuid);
      setListPrice(filtered);
    };
    fetchData();
  }, [setListPrice]);
  return (
    <div className="home">
      <div className="header">
        <div className="header__section">
          <h2>List Komoditas</h2>
        </div>
        <div className="header__section">
          <Button var="primary">Tambah Komoditas</Button>
        </div>
      </div>
      <div className="home__content"></div>
    </div>
  );
}
