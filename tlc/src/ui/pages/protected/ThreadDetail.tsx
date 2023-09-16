import { DetailComponent } from "../../components/protected/DetailComponent";
import { useParams } from "react-router-dom";

const safeBase64Decode = (data: string) => {
  data = data.replace("-", "+").replace("_", "/");
  while (data.length % 4) {
    data += "=";
  }
  return atob(data);
};

/**
 * Página Detalle de un thread
 * @returns
 */
export const ThreadDetail = () => {
  const { dataencoded } = useParams<{ dataencoded: string }>();

  let originalData = null;

  if (dataencoded) {
    const decodedData = safeBase64Decode(dataencoded);
    originalData = JSON.parse(decodedData);
  }

  return (
    <div className="container activity">
      <div className="row">
        <div className="col-12">
          <DetailComponent originalData={originalData} />
        </div>
      </div>
    </div>
  );
};
