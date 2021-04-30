import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Input from "../../components/input";
import Button from "../../components/button";
import { readAllData as readDataSize } from "../../api/size";
import { readAllData as readDataLocation } from "../../api/location";
import { addData } from "../../api/list";
import { DEFAULT_FORM_VALUE } from "../../constant/form";
import "./index.scss";

export default function AddCommodity() {
  const [locationData, setLocationData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_VALUE });
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const resLocation = await readDataLocation();
      setLocationData([
        ...resLocation.map(el => ({
          value: `${el.city},${el.province}`,
          label: `${el.city}, ${el.province}`
        }))
      ]);
      const resSize = await readDataSize();
      setSizeData([...resSize.map(el => ({ value: el.size, label: el.size }))]);
    };
    fetchData();
  }, [setLocationData, setSizeData]);
  const changeData = (e, ...rest) => {
    const oldData = { ...formData };
    if (rest.length === 1) {
      oldData[rest[0]] = e.target.value;
    } else {
      if (rest[0] === "dropdown") oldData[rest[1]] = e.value;
    }
    setFormData(oldData);
  };
  const submitData = () => {
    const [area_provinsi, area_kota] = formData.location.split(",");
    const { komoditas, size, price } = formData;
    addData({
      komoditas,
      area_provinsi,
      area_kota,
      size,
      price,
      uuid: uuidv4(),
      timestamp: Date.now()
    }).then(() => alert("Berhasil menambahkan data"));
    history.push("/");
  };
  const checkValidData = () => {
    return (
      formData.komoditas !== "" &&
      formData.size !== "" &&
      formData.price !== "" &&
      formData.location !== ""
    );
  };
  return (
    <>
      <h2>Tambah Komoditas</h2>
      <div className="form">
        <div className="form__section">
          <div className="form__field-group">
            <div className="form__field">
              <label className="form__label">Nama Komoditas</label>
              <Input
                type="text"
                value={formData.komoditas}
                placeholder="Masukkan nama komoditas ...."
                onChange={e => changeData(e, "komoditas")}
              />
            </div>
          </div>
          <div className="form__field-group">
            <div className="form__field">
              <label className="form__label">Lokasi</label>
              <Input
                type="dropdown"
                options={locationData}
                placeholder="Pilih Lokasi Komoditas"
                onChange={e => changeData(e, "dropdown", "location")}
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
                  value={formData.size}
                  onChange={e => changeData(e, "dropdown", "size")}
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
                <Input
                  type="number"
                  value={formData.price}
                  placeholder="Masukkan harga komoditas ...."
                  onChange={e => changeData(e, "price")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form__section form__submit-container">
          <Button
            var="primary"
            className="form__submit"
            disabled={!checkValidData()}
            onClick={() => submitData()}
          >
            Tambahkan Komoditas
          </Button>
        </div>
      </div>
    </>
  );
}
