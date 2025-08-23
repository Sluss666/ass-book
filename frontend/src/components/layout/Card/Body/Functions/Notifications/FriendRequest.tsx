import { useState } from "react";
import type {
  FRequest,
  FShipStates,
} from "../../../../../../types/Friendships";
import Request from "./FriendRequest/Request";
import Accepted from "./FriendRequest/Request/Accepted";
import Declined from "./FriendRequest/Request/Declined";

const FriendRequest = ({ request }: { request: FRequest }) => {
  const [requestState, setRequestState] = useState<FShipStates>("pending");
  const [solved, setSolved] = useState(false);
  return (
    <>
      {!solved && (
        <>
          {requestState == "pending" ? (
            <Request setRequestState={setRequestState} request={request} />
          ) : (
            <>
              {requestState == "accepted" ? <Accepted /> : <Declined />}
              {setTimeout(() => setSolved(true), 1000)}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FriendRequest;
