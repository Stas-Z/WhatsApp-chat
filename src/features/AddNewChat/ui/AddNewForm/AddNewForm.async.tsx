import { FC, lazy } from 'react'

import { AddNewFormProps } from './AddNewForm'

export const AddNewFormAsync = lazy<FC<AddNewFormProps>>(
    () => import('./AddNewForm'),
)
