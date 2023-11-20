import { useEffect, useState, useContext } from "react";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";

export default function PetitDrapeau(props) {
  const [estTrouve, setEstTrouve] = useState(false);

  const ctx = useContext(DrapeauxUtilisesContext);

  useEffect(() => {
    const estDansContext = ctx.drapeauxUtilises.some(pays => {
      return pays === props.drapeau.noms[0];
    })
    if(estDansContext) {
      setEstTrouve(true);
    }
  }, [ctx.drapeauxUtilises, props.drapeau.noms])

  let style = "border h-3/4 ";
  if(!estTrouve) {
    style += "opacity-50";
  }

  return (
    <div className="h-24 w-40 border-black flex flex-col items-center mb-4">
      <img src={props.drapeau.img} alt={props.drapeau.noms[0]} className={style}/>
      {estTrouve && <span className="text-center">{props.drapeau.noms[0]}</span>}
    </div>
  );
}