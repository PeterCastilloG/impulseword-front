import { IExtensionPacks } from "../../interfaces/analyzer.interfaces";
import Link from "next/link";
import styles from "./Extension-packs.module.scss";

export default function ExtensionPacks({
  extension,
  handlePurchaseChallengeOrderExtension
}: {
  extension: IExtensionPacks;
  handlePurchaseChallengeOrderExtension: (challengeExtensionId: number) => void;
}) {

  return (
    <div className={styles.extensiondays}>
      <p>
        {extension.message}{" "}
        {extension.link && (
          <Link href={extension.link} target="_blank" className={styles.link} prefetch={false}>
            aqui
          </Link>
        )}
      </p>
      {extension.packs.length >= 1 && (
        <div className={styles.btns}>
          {extension.packs.map((item) => (
            <div
              className={styles.btns}
              key={item.challengeId}
              onClick={() => handlePurchaseChallengeOrderExtension(item.challengeId)}
            >
              {item.packLabel}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
