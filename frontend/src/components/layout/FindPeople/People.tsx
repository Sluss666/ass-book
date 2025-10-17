import type { User } from "../../../types/User";
import FindPeopleUser from "./People/FindPeopleUser";

export type PeopleProps = {
  user: User;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
};

const People = ({ users,user,setUsers }:PeopleProps) => {
  return (
    <>
      {users
        .filter((us) => String(us._id) !== String(user._id) && us.user !== user.user)
        .map((u) => {
          return <FindPeopleUser key={u._id} u={u} setUsers={setUsers}/>
          })}
    </>
  );
};

export default People;
