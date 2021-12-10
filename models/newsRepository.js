const Repository = require('./repository');
const New = require('./new.js');
const utilities = require("../utilities");
const ImageFilesRepository = require('./imageFilesRepository.js');
//const Image = require('./image.js');

module.exports =
    class NewsRepository extends Repository {
        constructor(req) {
            super('News', true);//****/
            //this.news = new Repository('News');
            this.users = new Repository('Users');
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
            nouvelle["Date"] = utilities.nowInSeconds();
            if (New.valid(nouvelle)){
                nouvelle["GUID"] = ImageFilesRepository.storeImageData("", nouvelle["ImageData"]);
                //console.log("nouvelle testt", nouvelle)
                delete nouvelle["ImageData"];
                console.log(nouvelle)
                return super.add(nouvelle);
            }
            return null
        }
        update(nouvelle) {
            nouvelle["Date"] = utilities.nowInSeconds();
            let foundNouvelle = super.get(nouvelle.Id);
            if (foundNouvelle != null) {
                foundNouvelle["GUID"] = ImageFilesRepository.storeImageData(nouvelle["GUID"], nouvelle["ImageData"]);
                delete nouvelle["ImageData"];
                return super.update(nouvelle);
            }

            return false;
        }
        remove(id) {
            let foundNouvelle = super.get(id);
            if (foundNouvelle) {
                ImageFilesRepository.removeImageFile(foundNouvelle["GUID"]);
                return super.remove(id);
            }
            return false;
        }
    }