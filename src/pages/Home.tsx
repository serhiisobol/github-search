import { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

export function Home() {
	const [search, setSearch] = useState('');
	const [dropdown, setDropdown] = useState(false);
	const debounced = useDebounce(search);
	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
	});

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

	const clickHandler = (username: string) => {
		fetchRepos(username);
		setDropdown(false);
	};

	useEffect(() => {
		setDropdown(debounced.length > 3 && data?.length! > 0);
	}, [debounced, data]);

	return (
		<div className='flex relative justify-center py-28 mx-auto h-screen w-screen overflow-auto'>
			<div className='relative w-1/2'>
				{isError ? (
					<>
						<input
							type='text'
							className='font-mono bg-slate-150 border p-7 w-full h-[50px] mb-2 rounded-full text-lg text-slate-800 enabled:hover:border-slate-800'
							placeholder='Search for GitHub username...'
							value={search}
							onChange={event => setSearch(event.target.value)}
						/>
						<p className='text-red-600 pt-5 font-mono text-base text-center animate-pulse bg-slate-100'>
							Loading failed. Please check your connection and try again later.
						</p>
					</>
				) : (
					<input
						type='text'
						className='font-mono bg-slate-150 border p-7 w-full h-[50px] mb-2 rounded-full text-lg text-slate-800 enabled:hover:border-slate-800'
						placeholder='Search for GitHub username...'
						value={search}
						onChange={event => setSearch(event.target.value)}
					/>
				)}

				{dropdown && (
					<ul className='absolute list-none top-[100px] left-0 right-0 shadow-lg bg-slate-100 rounded-lg z-10'>
						{isLoading && <p className='text-center'>Loading...</p>}
						{data?.map(user => (
							<li
								key={user.id}
								onClick={() => clickHandler(user.login)}
								className='p-3 hover:rounded-lg hover:text-white transition-all rounded-lg cursor-pointer shadow-lg hover:bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900'
							>
								{user.login}
							</li>
						))}
					</ul>
				)}
				<div className='absolute top-[100px] left-0 right-0'>
					{areReposLoading && (
						<p className='text-slate-800 font-mono text-lg text-center animate-pulse bg-slate-100'>Repositories are loading...</p>
					)}
					{repos?.length === 0 && (
						<p className='text-slate-800 font-mono text-lg text-center animate-pulse bg-slate-100'>No repositories yet.</p>
					)}
					{repos?.length !== 0 && repos?.[0].owner.avatar_url && (
						<img src={repos?.[0].owner.avatar_url} className='rounded-full mb-10 m-auto h-[200px] w-[200px]' alt='owner_avatar' />
					)}
					{repos?.map(repo => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
}
