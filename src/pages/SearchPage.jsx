import React, { useEffect } from 'react';

import UserList from '../components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersAsyncThunk } from '../states/users/action';
import useInput from '../hooks/useInput';
import SearchBar from '../components/SearchBar';

const SearchPage = () => {
  const [keyword, setKeyword, resetKeyword] = useInput('');

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(setUsersAsyncThunk());
    }
  }, [dispatch, users]);

  const filterUsers = () => {
    return users.filter((user) => user.name.toLowerCase().includes(keyword.toLocaleLowerCase()));
  };

  return (
    <>
      <SearchBar keyword={keyword} keywordChangeHandler={setKeyword} resetKeyword={resetKeyword} />
      <UserList users={filterUsers()} />
    </>
  );
};

export default SearchPage;
