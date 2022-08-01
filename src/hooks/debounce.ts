import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 300): string {
	const [debounced, seTDebounced] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => seTDebounced(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debounced;
}
