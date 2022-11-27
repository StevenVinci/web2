import AddFilmPage from '../Pages/AddFilmPage';
import HomePage from '../Pages/HomePage';
import RegisteredFilms from '../Pages/RegisteredFilms'

const routes = {
  '/': HomePage,
  '/new': AddFilmPage,
  '/view': RegisteredFilms
};

export default routes;
