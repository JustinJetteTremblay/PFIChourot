/*
Une nouvelle est constituée des informations suivantes :
➢ Avatar et nom de l’auteur
➢ Date de parution
➢ Titre de la nouvelle
➢ Une image obligatoire
➢ Texte de la nouvelle
*/

module.exports = 
class New{
    ///Constructeur
    constructor(user,date,titre,GUID,texte)
    {
        this.Id = 0;
        this.UserId = user.Id !== undefined ? user.Id : 0;
        this.Date = date !== undefined ? date : "";
        this.Titre = titre !== undefined ? titre : "";
        this.GUID = GUID !== undefined ? GUID : "";
        this.Texte = texte !== undefined ? texte : "";
    }
    
    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('UserId', 'integer');
        validator.addField('Date','integer');
        validator.addField('Titre','string');
        validator.addField('Texte','string');
        return validator.test(instance);
    }
}