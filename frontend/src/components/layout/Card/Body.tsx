import { Link } from "react-router-dom";
import Functions from "./Body/Functions";
import { useUser } from "../../../context/useUser";

export interface CardBody {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function Body({ setIsLoading, setError, setText }: CardBody) {
  
  const {user} = useUser()
console.log('User in Card Body:', user)
  const isPage = ($Segments: string[]): boolean => {
    const slicedPath = location.pathname.split("/").slice(1);
    return $Segments.every((segment, index) => slicedPath[index] == segment);
  };
  
  return (
    <>
    {user &&<>
      <div className="pl-2">
        <Link reloadDocument to={"self"} className="block mt-1 select-text">
          <strong>{user.user || "NoUser"}</strong>
        </Link>
        {!isPage(["index", "self"]) && (
          <span className="absolute">
            {user.name && user.surnames
              ? `${user.name} ${user.surnames}`
              : "NoName"}
          </span>
        )}
      </div>
      <Functions setIsLoading={setIsLoading} setText={setText} setError={setError}/>
    </>}
    </>
  );
}

export default Body;
