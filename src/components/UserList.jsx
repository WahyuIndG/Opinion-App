import User from './User';

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <User {...user} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;
