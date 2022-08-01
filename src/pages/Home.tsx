import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

export function Home() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-1/2">
        <input
          type="text"
          className="font-mono bg-slate-150 border p-7 w-full h-[50px] mb-2 rounded-full text-lg text-slate-800 enabled:hover:border-slate-800"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {dropdown && (
          <ul className="absolute list-none top-[100px] left-0 right-0 shadow-lg bg-slate-100 rounded-lg">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="p-3 hover:rounded-lg hover:text-white transition-text-colors cursor-pointer shadow-lg hover:bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="absolute top-[100px] left-0 right-0">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
