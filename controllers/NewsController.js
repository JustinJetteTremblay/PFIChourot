const Repository = require('../models/repository');

const New = require('../models/new');
const NewsRepository = require('../models/newsRepository')

module.exports =
    class NewsController extends require('./Controller') {
        constructor(req, res) {
            super(req, res);
            this.newrepository = new NewsRepository(this.req);
        }

        head() {
            this.response.JSON(null, this.newrepository.ETag);
        }

        get(id) {
            // if we have no parameter, expose the list of possible query strings
            if (this.params === null) {
                if (!isNaN(id)) {
                    this.response.JSON(this.newrepository.get(id));
                    console.log(this.newrepository.get(id))
                }
                else
                    this.response.JSON(this.newrepository.getAll(),
                        this.newrepository.ETag);
            }
            else {
                if (Object.keys(this.params).length === 0) /* ? only */ {
                    this.queryStringHelp();
                } else {
                    this.response.JSON(this.newrepository.getAll(this.params), this.newrepository.ETag);
                }
            }
        }
        post(nouvelle) {
            console.log("post une nouvelle")
            if (this.requestActionAuthorized()) {
                let newNouvelle = this.newrepository.add(nouvelle);
                if (newNouvelle)
                    this.response.created(newNouvelle);
                else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        put(nouvelle) {
            if (this.requestActionAuthorized()) {
                if (this.newrepository.update(nouvelle))
                    this.response.ok();
                else
                    this.response.unprocessable();
            } else
                this.response.unAuthorized();
        }
        remove(id) {
            if (this.requestActionAuthorized()) {
                if (this.newrepository.remove(id))
                    this.response.accepted();
                else
                    this.response.notFound();
            } else
                this.response.unAuthorized();
        }
    }