const params = new URLSearchParams(window.location.search);
const count = params.get("count") || "0";
const reason = params.get("reason") || "ok";
const titleElem = document.getElementById("title");
const msgElem = document.getElementById("msg");

const lang = browser.i18n.getUILanguage();
const langKey = lang.substring(0, 2);

/**
 * @typedef {{ title: string, msg: string }} FinishCopy
 */

/** @type {Record<string, Record<string, FinishCopy>>} */
const translations = {
  ja: {
    ok: {
      title: "保存完了 (by K-tech Studio)",
      msg: `ダウンロード先に ${count} 個のファイルを保存しました。（フォルダ名: MailAttachments_日時_件名）`
    },
    no_message: {
      title: "保存できませんでした (by K-tech Studio)",
      msg: "メールが開かれていません。保存したいメールを表示してから、もう一度実行してください。"
    },
    no_attachments: {
      title: "保存できませんでした (by K-tech Studio)",
      msg: "このメールには添付ファイルがありません。"
    },
    failed: {
      title: "保存できませんでした (by K-tech Studio)",
      msg: "添付の保存に失敗しました。Thunderbird のダウンロード設定を確認してください。"
    }
  },
  en: {
    ok: {
      title: "Save Complete (by K-tech Studio)",
      msg: `Saved ${count} file(s) under a MailAttachments_<date>_<subject> folder in your download location.`
    },
    no_message: {
      title: "Could Not Save (by K-tech Studio)",
      msg: "No message is open. Open the message you want, then try again."
    },
    no_attachments: {
      title: "Could Not Save (by K-tech Studio)",
      msg: "This message has no attachments."
    },
    failed: {
      title: "Could Not Save (by K-tech Studio)",
      msg: "Could not save attachments. Check Thunderbird download settings."
    }
  },
  zh: {
    ok: {
      title: "保存完成 (by K-tech Studio)",
      msg: `已在下载目录保存 ${count} 个文件（MailAttachments_日期_主题 文件夹）。`
    },
    no_message: {
      title: "无法保存 (by K-tech Studio)",
      msg: "没有打开的邮件。请先打开要保存的邮件后再试。"
    },
    no_attachments: {
      title: "无法保存 (by K-tech Studio)",
      msg: "此邮件没有附件。"
    },
    failed: {
      title: "无法保存 (by K-tech Studio)",
      msg: "无法保存附件。请检查 Thunderbird 的下载设置。"
    }
  },
  fr: {
    ok: {
      title: "Enregistrement terminé (by K-tech Studio)",
      msg: `${count} fichier(s) enregistré(s) dans un dossier MailAttachments_<date>_<objet>.`
    },
    no_message: {
      title: "Enregistrement impossible (by K-tech Studio)",
      msg: "Aucun message ouvert. Ouvrez le message, puis réessayez."
    },
    no_attachments: {
      title: "Enregistrement impossible (by K-tech Studio)",
      msg: "Ce message n'a pas de pièces jointes."
    },
    failed: {
      title: "Enregistrement impossible (by K-tech Studio)",
      msg: "Impossible d'enregistrer les pièces jointes. Vérifiez les paramètres de téléchargement."
    }
  }
};

const locale = translations[langKey] || translations.en;
const copyKey = locale[reason] ? reason : "ok";
const t = locale[copyKey] || translations.en.ok;

if (titleElem) {
  titleElem.textContent = t.title;
}
if (msgElem) {
  msgElem.textContent = t.msg;
}

document.getElementById("okBtn").addEventListener("click", async () => {
  try {
    const currentWin = await browser.windows.getCurrent();
    await browser.windows.remove(currentWin.id);
  } catch (e) {
    console.error("Close failed:", e);
    window.close();
  }
});
