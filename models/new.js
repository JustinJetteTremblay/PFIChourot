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
    constructor(user,date=new Date(),titre,img,texte)
    {
        this.Id = 0;
        this.UserId = user.Id !== undefined ? user.Id : 0;
        this.Date = date !== undefined ? date : "";
        this.Titre = titre !== undefined ? titre : "";
        this.ImageGUID = img !== undefined ? img : "";
        this.Texte = texte !== undefined ? texte : "";
    }
    
}