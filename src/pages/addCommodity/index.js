import "./index.scss";

import Input from "../../components/input";
import Button from "../../components/button";
export default function AddCommodity() {
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
              <Input type="text" />
            </div>
            <div className="form__field">
              <label className="form__label">Ukuran</label>
              <div className="form__input-container">
                <Input type="text" />
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
            Buat Komoditas
          </Button>
        </div>
      </form>
    </>
  );
}
