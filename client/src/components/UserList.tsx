import { useUsers } from "../lib/graphql/hooks"
import { UserListProps } from "../lib/types";

export const UserList = ({ onUserSelect, selectedUserId }: UserListProps) => {
    const users = useUsers();

    return (
    <div>
        <h2 className="title is-4">Members</h2>
        <div className="buttons">
            {users.map((user) => 
            <button 
                onClick={() => onUserSelect(user)} 
                key={user.id}
                className={`button username ${user.id === selectedUserId ? "is-success" : "is-info is-outlined"}`}>
                {user.username}</button>)}
        </div>
    </div>)
}
