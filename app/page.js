import Image from "next/image";
import styles from "./page.module.css";

import Viewer from "./components/viewer";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>TCGA Lung Adenocarcinoma</h2>
      <Viewer />
    </div>
  );
}
