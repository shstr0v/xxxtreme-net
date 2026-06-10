import Image from "next/image";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./index.module.css";
import type { InfoPageContent } from "./content";

const questionMarks = [
  { left: "4.8%", top: "20%", size: 112 },
  { left: "20%", top: "31%", size: 118 },
  { left: "15.1%", top: "51%", size: 122 },
  { left: "4.8%", top: "61%", size: 116 },
  { left: "21%", top: "78%", size: 122 },
  { left: "34%", top: "81%", size: 116 },
  { left: "74%", top: "18%", size: 112 },
  { left: "86.3%", top: "39%", size: 112 },
  { left: "73.7%", top: "45%", size: 118 },
  { left: "77.4%", top: "65%", size: 122 },
  { left: "91%", top: "78%", size: 116 },
  { left: "72.8%", top: "90%", size: 116 },
  { left: "56%", top: "89%", size: 116 },
];

type InfoPageProps = {
  content: InfoPageContent;
  decorated?: boolean;
};

export default function InfoPage({ content, decorated = false }: InfoPageProps) {
  return (
    <>
      <Header />
      <main className={styles.page} data-decorated={decorated}>
        {decorated ? (
          <div className={styles.questionLayer} aria-hidden="true">
            {questionMarks.map((mark, index) => (
              <Image
                key={index}
                src="/question_mark.png"
                alt=""
                width={mark.size}
                height={mark.size}
                className={styles.questionMark}
                style={{
                  left: mark.left,
                  top: mark.top,
                  width: mark.size,
                  height: mark.size,
                }}
              />
            ))}
          </div>
        ) : null}

        <article className={styles.window} aria-labelledby="info-page-title">
          <div className={styles.windowBar}>{content.eyebrow}</div>
          <div className={styles.windowBody}>
            <h1 id="info-page-title">{content.title}</h1>
            <p className={styles.date}>Last updated: {content.updatedAt}</p>
            <p className={styles.intro}>{content.intro}</p>

            <div className={styles.sections}>
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
