/**
 * Classe service pour gérer les données
 */
export default class GetData {
    /*
    permet de recuperer les données à partir d'une URL et le transformer en format json et retourner les datas
    */
    async getDataFromUrl(url) {
        console.log("je suis la");
        const data = await fetch(url); //Récupération du contenu de la requete http
        const dataJson = await data.json(); //transformation du resultat en format json
        return (dataJson); // retourn les donnees du fichier json
    }
}