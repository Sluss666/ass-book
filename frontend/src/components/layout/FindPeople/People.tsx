import type { User } from "../../../types/User";
import FindPeopleUser from "./People/FindPeopleUser";

export type PeopleProps = {
  user: User;
  users: User[];
};

const People = ({ users, user }:PeopleProps) => {
  return (
    <>
      {users
        .filter((us) => String(us._id) !== String(user._id) && us.user !== user.user)
        .map((u) => {
          return <FindPeopleUser key={u._id} u={u} users={users}/>
          })}
    </>
  );
};

export default People;
