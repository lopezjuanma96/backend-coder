import { Router } from 'express';
const router = new Router()

class Router {
    constructor() {
        this.controller = new NewsController();
    }

    start() {
        router.get('/:id', this.controller.getNews);
        router.post('/', this.controller.saveNews);
        router.put('/:id', this.controller.updateNews);
        router.delete('/:id', this.controller.deleteNews);

        return router
    }
}

export default Router;