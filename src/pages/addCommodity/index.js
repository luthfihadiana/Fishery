import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Input from "../../components/input";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { readAllData as readDataSize } from "../../api/size";
import { readAllData as readDataLocation } from "../../api/location";
import { addData } from "../../api/list";
import { DEFAULT_FORM_VALUE } from "../../constant/form";
import "./index.scss";

export default function AddCommodity() {
  const [locationData, setLocationData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_VALUE });
  const [isSubmit, setIsSubmit] = useState(false);
  const refConfirmModal = useRef(null);
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
  const handlerShowConfirmModal = () => {
    refConfirmModal.current.showModal();
  };
  const closeShowConfirmModal = () => {
    refConfirmModal.current.hideModal();
  };
  const submitData = () => {
    setIsSubmit(true);
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
    }).then(() => {
      setIsSubmit(false);
      handlerShowConfirmModal();
      setFormData({ ...DEFAULT_FORM_VALUE });
    });
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
      <div className="header">
        <div className="header__section">
          <h2>Tambah Komoditas</h2>
        </div>
        <div className="header__section">
          <Button var="primary" onClick={() => history.push("/")}>
            Liat List Komoditas
          </Button>
        </div>
      </div>
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
            disabled={!checkValidData() || isSubmit}
            onClick={() => submitData()}
          >
            Tambahkan Komoditas
          </Button>
        </div>
      </div>
      <Modal title="Data Berhasil Diinput" ref={refConfirmModal}>
        <p>Yay!! Data komoditas berhasil ditambahkan </p>
        <div className="button-confirm">
          <Button var="primary" onClick={() => closeShowConfirmModal()}>
            Tambah Lagi
          </Button>
          <Button var="primary" outline={() => history.push("/")}>
            Liat Komoditas
          </Button>
        </div>
      </Modal>
    </>
  );
}
