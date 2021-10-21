import { useFormikContext } from "formik";
import coordinatesDTO from "../utils/coordinates.model";
import Map from "../utils/Map";

export default function MapField(props: mapFieldProps) {
  const { values } = useFormikContext<any>();
  function handleMapClick(coordinates: coordinatesDTO) {
    values[props.latFiled] = coordinates.lat;
    values[props.lngFiled] = coordinates.lng;
  }
  return (
    <Map coordinates={props.coordinates} handleMapClick={handleMapClick} />
  );
}

interface mapFieldProps {
  coordinates: coordinatesDTO[];
  latFiled: string;
  lngFiled: string;
}

MapField.defaultProps = {
  coordinates: [],
};
