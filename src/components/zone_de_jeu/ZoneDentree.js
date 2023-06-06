import { useRef, useEffect } from "react";

export default function ZoneDentree(props) {
  const inputRef = useRef(null);

  function envoyerRep(event) {
    event.preventDefault();
    const juste = props.onEnvoi(inputRef.current.value);
    if(juste) {
      inputRef.current.value = "";
    }
  }

  function passer() {
    props.onSkip();
    inputRef.current.focus();
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={envoyerRep} className="flex flex-col gap-2">
      <input type="text" className="border" ref={inputRef}/>
      <input type="submit" className="border" value="Envoyer"/>
      <button className="border" onClick={passer}>Passer</button>
    </form>
  );
}