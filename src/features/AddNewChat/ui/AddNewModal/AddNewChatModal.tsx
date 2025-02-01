import { memo, Suspense } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal'
import { Skeleton } from '@/shared/ui/Skeleton'

import { AddNewFormAsync } from '../AddNewForm/AddNewForm.async'

interface AddNewChatModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const AddNewChatModal = memo((props: AddNewChatModalProps) => {
    const { className, isOpen, onClose } = props

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
            overlay
        >
            <Suspense fallback={<Skeleton />}>
                <AddNewFormAsync onClose={onClose} />
            </Suspense>
        </Modal>
    )
})
AddNewChatModal.displayName = 'AddNewChatModal'
