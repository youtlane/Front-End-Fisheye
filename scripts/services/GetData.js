/**
 * Classe service pour gérer les données
 */
export class GetData {
    /*
    permet de recuperer les données à partir d'une URL et le transformer en format json et retourner les datas
    */
    async getDataFromUrl() {
        const data = await fetch("./data/photographers.json"); //Récupération du contenu de la requete http
        const dataJson = await data.json(); //transformation du resultat en format json

        console.log("je suis la", dataJson);

        return (dataJson); // retourn les donnees du fichier json
    }
}