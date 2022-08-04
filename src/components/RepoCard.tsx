import React, { useState } from 'react';
import { useActions } from '../hooks/action';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

export function RepoCard({ repo }: { repo: IRepo }) {
	const { addFavorite, removeFavorite } = useActions();

	const { favorites } = useAppSelector(state => state.github);

	const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url));

	const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		addFavorite(repo.html_url);
		setIsFavorite(true);
	};

	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		removeFavorite(repo.html_url);
		setIsFavorite(false);
	};

	return (
		<div className='rounded-lg p-5 mb-5 shadow-xl transition-all hover:rounded-lg hover:text-white hover:bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 font-mono'>
			<a href={repo.html_url} target='blank'>
				<h2 className='text-lg font-bold mb-1'>{repo.full_name}</h2>
				<p className='text-sm mb-1'>
					{repo.language && (
						<>
							Language: <span className='font-bold mr-2'>{repo.language}</span>
						</>
					)}
					{repo.forks !== 0 && (
						<>
							Forks: <span className='font-bold mr-2'>{repo.forks}</span>
						</>
					)}
					{repo.watchers !== 0 && (
						<>
							Watchers: <span className='font-bold'>{repo.watchers}</span>
						</>
					)}
				</p>
				<p className='text-sm font-thin mb-4'>{repo.description}</p>
				{isFavorite ? (
					<button
						className='text-white px-4 py-1 bg-gradient-to-r from-red-700 via-red-800 to-red-900 rounded-full hover:shadow-md transition-all '
						onClick={removeFromFavorite}
					>
						Remove
					</button>
				) : (
					<button
						className='hover:bg-white text-white px-4 py-1 bg-gradient-to-r from-green-700 via-green-800 to-green-900 mr-2 rounded-full hover:shadow-md transition-all'
						onClick={addToFavorite}
					>
						Add
					</button>
				)}
			</a>
		</div>
	);
}
