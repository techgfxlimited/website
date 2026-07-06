import { readable } from 'svelte/store';
import { browser } from '$app/environment';

export const pageVisible = readable(true, (set) => {
    if (!browser) return;

    const handleVisibilityChange = () => {
        set(!document.hidden);
    };

    set(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
});