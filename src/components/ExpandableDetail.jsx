import "../styles/ExpandableDetail.css";
function ExpandableDetail({ data, onClose }) {
  return (
    <div className="expandable-detail">
      <button onClick={onClose} className="close-button">
        ×
      </button>
      <img
        src={`/image/all_flower/${data.filename}`}
        alt={data.filename}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <p>科目：</p>
      <p>品種：{data.filename.replace(".jpeg", " ")}</p>
      <p>サイズ：</p>
      <p>開花時期：</p>
    </div>
  );
}

export default ExpandableDetail;
