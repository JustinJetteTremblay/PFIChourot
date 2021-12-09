const Repository = require('./repository');
const New = require('./new.js');
const utilities = require("../utilities");
const ImageFilesRepository = require('./imageFilesRepository.js');
//const Image = require('./image.js');

module.exports =
    class NewsRepository extends Repository {
        constructor(req) {
            super('News', true);//****/
            this.news = new Repository('News');
            this.req = req;
            this.setBindExtraDataMethod(this.bindUsernameAndImageURL);
        }
        bindUsernameAndImageURL(image) {
            if (image) {
                let user = this.users.get(image.UserId);
                let username = "unknown";
                if (user !== null)
                    username = user.Name;
                let bindedImage = { ...image };
                bindedImage["Username"] = username;
                bindedImage["Date"] = utilities.secondsToDateString(image["Created"]);
                if (image["GUID"] != "") {
                    bindedImage["OriginalURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getImageFileURL(image["GUID"]);
                    bindedImage["ThumbnailURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getThumbnailFileURL(image["GUID"]);
                } else {
                    bindedImage["OriginalURL"] = "";
                    bindedImage["ThumbnailURL"] = "";
                }
                return bindedImage;
            }
            return null;
        }
        // peuple le fichier .json
        add(nouvelle) {
            console.log("dans le add")
            nouvelle["Created"] = utilities.nowInSeconds();
            nouvelle["ImageGUID"] = ImageFilesRepository.storeImageData("", nouvelle["ImageData"]);
            console.log("nouvelle testt", nouvelle)
            delete nouvelle["ImageData"];
            return super.add(nouvelle);
        }
        update(nouvelle) {
            nouvelle["Created"] = utilities.nowInSeconds();
            let foundImage = super.get(image.Id);
            if (foundImage != null) {
                image["GUID"] = ImageFilesRepository.storeImageData(image["GUID"], image["ImageData"]);
                delete image["ImageData"];
                return super.update(image);
            }

            return false;
        }
        remove(id) {
            let foundImage = super.get(id);
            if (foundImage) {
                ImageFilesRepository.removeImageFile(foundImage["GUID"]);
                return super.remove(id);
            }
            return false;
        }
    }