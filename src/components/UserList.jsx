import User from './User';

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} tabIndex={0}>
          <User {...user} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
