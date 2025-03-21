import { useParams } from "react-router-dom";
const DepartmentPage = () => {

  // Get the asset ID from the URL
  const { id } = useParams();

  return (
    <>DepartmentPage</>
  )
}

export default DepartmentPage