export const getUrlParam = ({ url, param }: { url?: string; param: string }) =>
    new URLSearchParams(url || window.location.href).get(param)
