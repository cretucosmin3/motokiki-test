const defaultTyreImage =
  "https://media.istockphoto.com/vectors/tire-with-thumbs-up-vector-id529495547?k=6&m=529495547&s=612x612&w=0&h=W6j58tDl7leoIcVF7nYNPqCDc9thxyp0CzrnH58dA0k=";

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const TyreCard = ({ title, size, image, brandLogo, price }) => {
  return (
    <div className="product-card flex column">
      <div className="title font22 pt5">{title}</div>
      <div className="size font15">{size}</div>
      <img
        className="image"
        src={validURL(image) ? image : defaultTyreImage}
        alt=""
      />
      <div className="details justify-between">
        <div className="font22 ph15 price">£{parseFloat(price).toFixed(2)}</div>
        {validURL(brandLogo) ? (
          <img className="brand-logo" src={brandLogo} alt="brand-logo" />
        ) : null}
      </div>
    </div>
  );
};
export default TyreCard;
