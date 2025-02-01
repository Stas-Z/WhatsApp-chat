import { useEffect, useCallback } from 'react'

export const useEnterKey = (callback: () => void) => {
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                callback()
            }
        },
        [callback],
    )

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])
}
