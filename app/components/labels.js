"use client"
import { useEffect, useState } from "react";
import styles from "./viewer.module.css";

export default function Labels({lepidic, setLepidic, acinar, setAcinar, papillary, setPapillary, micropapillary, setMicropapillary,
    cribriform, setCribriform, solid, setSolid,mucinous, setMucinous, stas, setStas}) {
  // const [lepidic, setLepidic] = useState(false);
  // const [acinar, setAcinar] = useState(false);
  // const [papillary, setPapillary] = useState(false);
  // const [micropapillary, setMicropapillary] = useState(false);
  // const [cribriform, setCribriform] = useState(false);
  // const [solid, setSolid] = useState(false);
  // const [mucinous, setMucinous] = useState(null);
  // const [stas, setStas] = useState(null);
  
  useEffect(() => {

  }, []); 

  function changeButton() {
    setCurrFile(files[i-1]);
    setCurrFrac(patchInfo[files[i-1]]);
    fetchAnnotation(files[i-1].slice(0, -4))
    set_i(i-1);
  }

  const handleClick = (status, setStatus, option) => {
    if (status === option) {
      // if clicking the same button again → unselect
      setStatus(null);
    } else {
      setStatus(option);
    }
  };

  return (
    <div className={styles.labelsContainer}>
      <div className={styles.labelRow}>
        <div className={styles.labelName}>
          <h3>Growth pattern(s):</h3>
        </div>
        <div className={styles.labelButtons}>
          <button onClick={() => setLepidic(!lepidic)} 
          className={lepidic ? styles.selectedButton : styles.unselectedButton}>Lepidic</button>
          <button onClick={() => setAcinar(!acinar)} 
          className={acinar ? styles.selectedButton : styles.unselectedButton}>Acinar</button>
          <button onClick={() => setPapillary(!papillary)} 
          className={papillary ? styles.selectedButton : styles.unselectedButton}>Papillary</button>
          <button onClick={() => setMicropapillary(!micropapillary)} 
          className={micropapillary ? styles.selectedButton : styles.unselectedButton}>Micropapillary</button>
          <button onClick={() => setCribriform(!cribriform)} 
          className={cribriform ? styles.selectedButton : styles.unselectedButton}>Cribriform</button>
          <button onClick={() => setSolid(!solid)} 
          className={solid ? styles.selectedButton : styles.unselectedButton}>Solid</button>
        </div>
      </div>
      <div className={styles.labelRow}>
        <div className={styles.labelName}>
          <h3>Mucinous status:</h3>
        </div>
        <div className={styles.labelButtons}>
          <button onClick={() => handleClick(mucinous, setMucinous, "mucinous")}
            className={mucinous === "mucinous" ? styles.selectedButton : styles.unselectedButton}>Mucinous</button>
          <button onClick={() => handleClick(mucinous, setMucinous, "non-mucinous")}
            className={mucinous === "non-mucinous" ? styles.selectedButton : styles.unselectedButton}>Non-mucinous</button>
        </div>
      </div>
      <div className={styles.labelRow}>
        <div className={styles.labelName}>
          <h3>STAS:</h3>
        </div>
        <div className={styles.labelButtons}>
          <button onClick={() => handleClick(stas, setStas, "present")}
            className={stas === "present" ? styles.selectedButton : styles.unselectedButton}>Present</button>
          <button onClick={() => handleClick(stas, setStas, "absent")}
            className={stas === "absent" ? styles.selectedButton : styles.unselectedButton}>Absent</button>
          <button onClick={() => handleClick(stas, setStas, "indeterminate")}
            className={stas === "indeterminate" ? styles.selectedButton : styles.unselectedButton}>Indeterminate</button>
        </div>
      </div>
      {/* <p><strong>Growth pattern(s)</strong>: {currAnnotation["growth_patterns"] ? currAnnotation["growth_patterns"].join(", ") : null}</p>
      <p><strong>Mucinous status</strong>: {currAnnotation["mucinous_status"]}</p>
      <p><strong>Spread through airways (STAS)</strong>: {currAnnotation["STAS"]}</p> */}
    </div>
  );
}
