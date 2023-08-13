import { TSortType } from '@/types'

export const ALBUM_PATH = '/album/'
export const ROOT_FOLDER = 'root'
export const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.install'
]
export const SORT_TYPES: TSortType[] = [
    {
        name: 'date',
        type: 'createdTime'
    },
    { name: 'name', type: 'name_natural' }
]
