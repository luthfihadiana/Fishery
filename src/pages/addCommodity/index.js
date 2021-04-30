import { useState, useEffect } from "react";

import Input from "../../components/input";
import Button from "../../components/button";
import { readAllData as readDataSize } from "../../api/size";
import { readAllData as readDataLocation } from "../../api/location";
import "./index.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
export default function AddCommodity() {
  const [locationData, setLocationData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resLocation = await readDataLocation();
      setLocationData([
        ...resLocation.map(el => ({
          value: { ...el },
          label: `${el.city}, ${el.province}`
        }))
      ]);
      const resSize = await readDataSize();
      setSizeData([...resSize.map(el => ({ value: el.size, label: el.size }))]);
    };
    fetchData();
  }, [setLocationData, setSizeData]);
  return (
    <>
      <h2>Tambah Komoditas</h2>
      <form className="form">
        <div className="form__section">
          <div className="form__field-group">
            <div className="form__field">
              <label className="form__label">Nama Komoditas</label>
              <Input type="text" />
            </div>
          </div>
          <div className="form__field-group">
            <div className="form__field">
              <label className="form__label">Lokasi</label>
              <Input
                type="dropdown"
                options={locationData}
                placeholder="Pilih Lokasi Komoditas"
              />
            </div>
            <div className="form__field">
              <label className="form__label">Ukuran</label>
              <div className="form__input-container">
                <Input
                  type="dropdown"
                  className="input-dropdown"
                  options={sizeData}
                  placeholder="Pilih Ukuran Komoditas"
                />
                <span className="form__currency">Cm</span>
              </div>
            </div>
          </div>
          <div className="form__field-group">
            <div className="form__field">
              <label className="form__label">Harga</label>
              <div className="form__input-container">
                <span className="form__currency">Rp.</span>
                <Input type="number" />
              </div>
            </div>
          </div>
        </div>
        <div className="form__section form__submit-container">
          <Button var="primary" className="form__submit">
            Tambahkan Komoditas
          </Button>
        </div>
      </form>
    </>
  );
}
