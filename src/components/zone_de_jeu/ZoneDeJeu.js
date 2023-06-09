import { useState, useContext, useEffect } from "react";
import ZoneDentree from "./ZoneDentree";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";
import ResultatsContext from "../store/resultats-context";

export default function ZoneDeJeu(props) {
  const [drapeauActuel, setDrapeauActuel] = useState(props.drapeaux[Math.floor(Math.random() * props.drapeaux.length)]);
  const [drapeauxRestants, setDrapeauxRestants] = useState([...props.drapeaux]);

  const ctxDrapeauxUtilises = useContext(DrapeauxUtilisesContext);
  const ctxResultats = useContext(ResultatsContext);

  function nettoyerChaine(chaine) {
    const chaineSansAccents = chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const chaineNettoyee = chaineSansAccents.replace(/[^a-zA-Z]/g, '');
    return chaineNettoyee;
  }

  function validationDrapeau(drapeauEntre) {
    let retour = false;
    if(nettoyerChaine(drapeauEntre).toLowerCase()===nettoyerChaine(drapeauActuel.nom).toLowerCase()) {
      ctxDrapeauxUtilises.ajouterDrapeau(drapeauActuel);
      setDrapeauxRestants(drapeauxRestants.filter(pays => {
        return pays.nom !== drapeauActuel.nom;
      }));
      retour = true;
    } else {
      ctxResultats.ajouterErreur();
    }
    return retour;
  }

  function changerDrapeau() {
    if(drapeauxRestants.length!==0) {
      setDrapeauActuel(drapeauxRestants[Math.floor(Math.random() * drapeauxRestants.length)]);
    } else {
      ctxResultats.finir();
      props.onTermine();
    }
  }

  function passer() {
    changerDrapeau();
  }

  useEffect(() => {
    changerDrapeau();
  }, [drapeauxRestants.length])

  useEffect(() => {
    setDrapeauxRestants([...props.drapeaux])
  }, [props.drapeaux])

  return (
    <div className="flex gap-2">
      <img src={drapeauActuel.img} alt={drapeauActuel.nom} className="border"/>
      <ZoneDentree onEnvoi={validationDrapeau} onSkip={passer} nomDrapeau={drapeauActuel.nom}/>
    </div>
  );
}