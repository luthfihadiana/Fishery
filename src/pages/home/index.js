import { useEffect, useState } from "react";
import "./index.scss";
import Button from "../../components/button";
import Input from "../../components/input";
import PageHeader from "../../components/pageHeader";
import LoadingIndicator from "../../components/loadingIndicator";
import { readAllData } from "../../api/list";
import { useHistory } from "react-router-dom";

import Fish from "../../assets/img/fish.jpg";
export default function Home() {
  const [listCommodity, setListCommodity] = useState([]);
  const [listAllCommodity, setListAllCommodity] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await readAllData();
      const filtered = data.filter(el => el.uuid);
      setListAllCommodity(filtered);
      setLoading(false);
    };
    fetchData();
  }, [setLoading, setListAllCommodity]);
  useEffect(() => {
    if (searchName !== "") {
      const dataCommodity = [...listAllCommodity];
      setListCommodity(
        dataCommodity.filter(
          el =>
            el.komoditas &&
            el.komoditas.toLowerCase().includes(searchName.toLowerCase())
        )
      );
    } else {
      setListCommodity([...listAllCommodity]);
    }
  }, [listAllCommodity, setListCommodity, searchName, setLoading]);
  const goToPage = url => {
    history.push(url);
  };
  return (
    <>
      <PageHeader
        left={
          <h2>
            {(searchName && `Pencarian untuk '${searchName}'`) ||
              "List Komoditas"}
          </h2>
        }
        right={
          <Button var="primary" onClick={() => goToPage("/tambah-komoditas")}>
            Tambah Komoditas
          </Button>
        }
      />
      <div className="home__content">
        <div className="search-box">
          <Input
            type="text"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="search-box__input"
            placeholder="Ketik nama komoditas yang dicari"
          />
        </div>
        <div
          className={`list-commodity ${
            ((listCommodity.length <= 0 || loading) && "center") || ""
          }`}
        >
          {(loading && <LoadingIndicator />) ||
            (listCommodity.length > 0 &&
              listCommodity.map((el, idx) => (
                <div className="commodity" key={el.uuid + idx}>
                  <img
                    src={Fish}
                    className="commodity__image"
                    alt="commodity_image"
                  />
                  <div className="commodity__info">
                    <p className="commodity__name">{el.komoditas || ""}</p>
                    <p className="commodity__price">
                      {(el.price && `Rp.${el.price}`) || "-"}
                    </p>
                    <p className="commodity__place">{`${el.area_kota}, ${el.area_provinsi}`}</p>
                    <p className="commodity__size">
                      {(el.size && `${el.size} cm`) || "-"}
                    </p>
                  </div>
                </div>
              ))) || (
              <p className="commodity__empty">
                Tidak ada komoditas bernama '{searchName}'
              </p>
            )}
        </div>
      </div>
    </>
  );
}
