import { useAppSelector } from "../hooks/redux";

export function FavoritesRepositories() {
  const { favorites } = useAppSelector((state) => state.github);

  if (favorites.length === 0)
    return (
      <p className="text-slate-800 text-lg text-center p-5 animate-pulse bg-slate-200 h-screen w-screen">
        Favorites repositories are empty.
      </p>
    );

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen bg-slate-200">
      <ul className="list-none">
        {favorites.map((f) => (
          <li key={f}>
            <a href={f} target="blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
