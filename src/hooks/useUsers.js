import { useState, useCallback, useEffect } from "react";
import { BACKEND_API_URL } from "../config";

export default function useUsers(page, filter) {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", 20);
    if (filter.firstName) params.append("firstName", filter.firstName);
    if (filter.education) params.append("education", filter.education);
    if (filter.location) params.append("location", filter.location);
    if (filter.hometown) params.append("hometown", filter.hometown);
    return params.toString();
  }, [page, filter]);

  useEffect(() => {
    fetch(`${BACKEND_API_URL}/users?${buildQueryString()}`)
      .then((res) => res.json())
      .then((data) => {
        const mappedUsers = (data._embedded?.mongoUserDTOList || []).map((user) => ({
          ...user.userProfile,
          answers: user.content?.answers || [],
          photos: user.content?.photos || [],
        }));
        setUsers(mappedUsers);
        setTotalCount(data.page?.totalElements || 0);
      })
      .catch(() => {
        setUsers([]);
        setTotalCount(0);
      });
  }, [buildQueryString]);

  return { users, totalCount };
}