"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./viewer.module.css";

import Labels from "./labels";

export default function Viewer() {
  const [i, set_i] = useState(0);
  const [currFile, setCurrFile] = useState("");
  const [currSlide, setCurrSlide] = useState("");
  const [patchIdx, setPatchIdx] = useState("");
  const [numPatches, setNumPatches] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const [lepidic, setLepidic] = useState(false);
  const [acinar, setAcinar] = useState(false);
  const [papillary, setPapillary] = useState(false);
  const [micropapillary, setMicropapillary] = useState(false);
  const [cribriform, setCribriform] = useState(false);
  const [solid, setSolid] = useState(false);
  const [mucinous, setMucinous] = useState(null);
  const [stas, setStas] = useState(null);

  const states = {lepidic, setLepidic, acinar, setAcinar, papillary, setPapillary, micropapillary, setMicropapillary,
    cribriform, setCribriform, solid, setSolid,mucinous, setMucinous, stas, setStas
  };

  useEffect(() => {
    async function fetchPatches() {
      const res = await fetch("/api/list-patches");
      const data = await res.json();
      setCurrFile(data[0]);
      setFiles(data);
    }
    fetchPatches();
  }, []); 

  function resetVariables() {
    setLepidic(false);
    setAcinar(false);
    setPapillary(false);
    setMicropapillary(false);
    setCribriform(false);
    setSolid(false);
    setMucinous(null);
    setStas(null);
  }

  useEffect(() => {
    const newSlide = currFile.split("_")[0];
    if (currSlide !== newSlide) {
      setCurrSlide(newSlide);
      let patches = files.filter(file => file.startsWith(newSlide));
      setNumPatches(patches.length);
      setPatchIdx(patches.indexOf(currFile) + 1);
      resetVariables();
    }
  }, [currFile]); 

  function prevPatch() {
    setError(null);
    setPatchIdx(patchIdx - 1);
    setCurrFile(files[i-1]);
    set_i(i-1);
    
  }

  function nextPatch() {
    setError(null);
    setPatchIdx(patchIdx + 1);
    setCurrFile(files[i+1]);
    set_i(i+1);
  }

  async function submit() {
    if (!lepidic && !acinar && !papillary && !micropapillary && !cribriform && !solid) {
      setError("Please select at least one growth pattern");
      return;
    }
    if (!mucinous) {
      setError("Please select a mucinous status");
      return;
    }
    if (!stas) {
      setError("Please select a STAS status");
      return;
    }
    nextPatch()
    const split = currFile.split("_");
    const rowData = [currSlide, split[1], split[2].split(".")[0], lepidic, acinar, papillary, micropapillary, cribriform, solid, mucinous, stas];
    try {
      const res = await fetch("/api/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row: rowData }),
      });
    } catch (err) {
      console.error(err);
    }    
  }

  return (
    <div className={styles.container}>
      <div>
        <Image
          src={"/patches/" + currFile}
          alt="JPEG image"
          width={512}
          height={512}
          className="object-contain"
        />
      </div>
      {/*{currFile ? currFile : null}
      <p className={styles.counter}>{i+1} / {files.length}</p>*/}
      <div className={styles.annotationContainer}>
        {currFile ? <h3>{currSlide}</h3> : null}
        <p>Patch {patchIdx} of {numPatches}</p>
        <Labels {...states} />
        <div className={styles.arrowsContainer}>
          <button onClick={prevPatch} disabled={i<=0} className={styles.whiteButton}><h4>Back</h4></button>
          <button onClick={nextPatch} disabled={i>=files.length-1} className={styles.whiteButton}><h4>Skip</h4></button>
          <button onClick={submit} disabled={i>=files.length-1} className={styles.submitButton}><h3>Submit</h3></button>
        </div>
        <p className={styles.error}>{error ? error : ""}</p>
        <p className={styles.counter}>{i+1} / {files.length} total patches</p>
      </div>
    </div>
  );
}
