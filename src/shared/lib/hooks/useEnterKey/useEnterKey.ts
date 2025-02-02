import { useEffect, useCallback, RefObject } from 'react'

export const useEnterKey = (
    callback: () => void,
    ref: RefObject<HTMLInputElement | null>,
) => {
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter' && ref.current === document.activeElement) {
                callback()
            }
        },
        [callback, ref],
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])
}
