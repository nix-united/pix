export const copyURL = async () => {
    return await navigator.clipboard.writeText(location.href)
}
