import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ALBUM_PATH } from './constants'
import { GalleryPage, HomePage, NotFoundPage } from './pages'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route element={<PrivateRoute />}>
                    <Route
                        path={ALBUM_PATH + ':folderId'}
                        element={<GalleryPage />}
                    />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
