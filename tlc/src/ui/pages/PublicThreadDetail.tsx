import { useParams } from "react-router-dom";
import { PublicDetailComponent } from "../components/PublicDetailComponent";

const safeBase64Decode = (data: string) => {
  data = data.replace("-", "+").replace("_", "/");
  while (data.length % 4) {
    data += "=";
  }
  return atob(data);
};

/**
 *  Página Pública de un thread con los datos mínimos
 * @returns
 */

export const PublicThreadDetail = () => {
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
          <PublicDetailComponent originalData={originalData} />
        </div>
      </div>
    </div>
  );
};
