import { useAppSelector } from '../hooks/redux';

export function FavoritesRepositories() {
	const { favorites } = useAppSelector(state => state.github);

	if (favorites.length === 0)
		return (
			<p className='text-slate-800 text-lg text-center p-5 animate-pulse bg-slate-200 h-screen w-screen'>
				Favorites repositories are empty.
			</p>
		);

	return (
		<div className='mx-auto h-screen w-screen bg-slate-200 pt-10 overflow-auto'>
			<h2 className='text-center text-xl font-mono pt-20'>Favorites repositories:</h2>
			<div className='flex justify-center pt-5 mx-auto'>
				<ul className='list-none'>
					{favorites.map(f => (
						<li
							key={f}
							className='p-3 hover:rounded-lg hover:text-white transition-all rounded-lg cursor-pointer shadow-lg hover:bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900'
						>
							<a href={f} target='blank'>
								{f}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
