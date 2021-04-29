import "./index.scss";
import Button from "../../components/button";
export default function Home() {
  return (
    <div className="home">
      <div className="header">
        <div className="header__section">
          <h2>List Harga Sumber Perikanan</h2>
        </div>
        <div className="header__section">
          <Button var="primary">Tambah Sumber Perikanan</Button>
        </div>
      </div>
      <div className="home__content">
        <h2>dkjasbndjks</h2>
      </div>
    </div>
  );
}
