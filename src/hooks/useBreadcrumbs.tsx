import { useEffect, useState } from 'react'

import { TBreadcrumb, TDriveFolderInfo } from '@/types'
import { ROOT_FOLDER } from '@/constants'
import { $google } from '@/api/axios'
import { googleRoutes } from '@/api/paths'

const ROOT_BREADCRUMB = {
    id: ROOT_FOLDER,
    name: 'Home',
    trashed: false
}

const getFolderInfo = async (folderId: string) => {
    const { data } = await $google.get<TDriveFolderInfo>(
        `${googleRoutes.folderContent}/${folderId}`,
        {
            params: {
                fields: 'id,name,parents,trashed',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
            }
        }
    )
    return data
}

export const useBreadcrumbs = (folderId: string) => {
    const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[] | null>(null)
    const [isBreadcrumbsLoading, setIsBreadcrumbsLoading] = useState(true)

    useEffect(() => {
        const getBreadcrumbs = async (folderId: string) => {
            const { id, name, trashed, parents } = await getFolderInfo(folderId)
            const currentFolder: TBreadcrumb = parents
                ? { id, name, trashed }
                : ROOT_BREADCRUMB
            const items: TBreadcrumb[] = [currentFolder]
            let folderParents = parents

            while (folderParents && folderParents.length) {
                const { id, name, trashed, parents } = await getFolderInfo(
                    folderParents[0]
                )

                items.unshift(parents ? { id, name, trashed } : ROOT_BREADCRUMB)
                folderParents = parents
            }

            setBreadcrumbs(items)
            setIsBreadcrumbsLoading(false)
            return breadcrumbs
        }

        getBreadcrumbs(folderId)
    }, [folderId])

    return { breadcrumbs, isBreadcrumbsLoading }
}
