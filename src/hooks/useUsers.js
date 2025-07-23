import { useState, useCallback, useEffect } from "react";
import { BACKEND_API_URL } from "../config";

export default function useUsers(page, filter) {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", 10);
    if (filter.firstName) params.append("firstName", filter.firstName);
    if (filter.education) params.append("education", filter.education);
    if (filter.location) params.append("location", filter.location);
    if (filter.hometown) params.append("hometown", filter.hometown);
    return params.toString();
  }, [page, filter]);

  useEffect(() => {
    // 1. Fetch users (without content)
    fetch(`${BACKEND_API_URL}/users?${buildQueryString()}`)
      .then((res) => res.json())
      .then(async (data) => {
        // Extract user profiles from response
        const usersOnly = (data._embedded?.mongoUserDTOList || []).map(
          (user) => ({ userId: user.userId, ...user.userProfile })
        );

        setTotalCount(data.page?.totalElements || 0);

        if (!usersOnly.length) {
          setUsers([]); // no users means no content
          return;
        }

        // 2. Build comma-separated userIds parameter (no spaces!)
        const userIdsParam = usersOnly.map((u) => u.userId).join(",");

        // 3. Fetch content separately using comma-separated userIds
        const contentRes = await fetch(
          `${BACKEND_API_URL}/content?userIds=${encodeURIComponent(userIdsParam)}`
        );

        if (!contentRes.ok) throw new Error("Failed to fetch content");

        const contentData = await contentRes.json();

        // 4. Map content by userId for quick lookup
        const contentMap = {};
        contentData.forEach((content) => {
          contentMap[content.userId] = content;
        });

        // 5. Merge content into user objects
        const usersWithContent = usersOnly.map((user) => {
          const userContent = contentMap[user.userId]?.content || {
            answers: [],
            photos: [],
          };
          return {
            ...user,
            answers: userContent.answers,
            photos: userContent.photos,
            content: userContent, // optional, if you still want the full content object
          };
        });

        // 6. Save merged result in state
        setUsers(usersWithContent);
      })
      .catch(() => {
        setUsers([]);
        setTotalCount(0);
      });
  }, [buildQueryString]);

  return { users, totalCount };
}
