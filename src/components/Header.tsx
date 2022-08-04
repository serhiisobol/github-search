import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export function Header() {
	const { favorites } = useAppSelector(state => state.github);

	return (
		<nav className='z-20 fixed top-0 left-0 right-0 flex justify-between items-center h-[80px] p-10 shadow-lg shadow-slate-600/40 text-white bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900'>
			<h2 className='text-2xl font-bold'>
				<i className='fa-brands fa-github mr-3'></i>
				GitHub Search
			</h2>
			<h3 className='text-lg font-mono uppercase'>
				<Link to='/' className='mr-10'>
					<i className='fa-solid fa-house mr-3'></i>
					Home
				</Link>
				<Link to='/favorites' className='relative'>
					{favorites.length !== 0 && (
						<>
							<span className='animate-ping absolute h-4 w-4 rounded-full bg-slate-100 opacity-75'></span>
							<span className='relative rounded-full h-4 w-4 bg-slate-100'></span>
						</>
					)}
					<i className='fa-solid fa-bookmark mr-3'></i>
					Favorites Repositories
				</Link>
			</h3>
		</nav>
	);
}
