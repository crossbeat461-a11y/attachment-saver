// 保存件数をURLパラメータから取得
const params = new URLSearchParams(window.location.search);
const count = params.get('count') || "0";
const titleElem = document.getElementById('title');
const msgElem = document.getElementById('msg');

// ブラウザのUI言語を取得
const lang = browser.i18n.getUILanguage();

/**
 * 言語ごとのテキスト設定 (タイトルを by K-tech Studio に統一)
 */
const translations = {
  ja: {
    title: "保存完了 (by K-tech Studio)",
    msg: `<b>デスクトップ</b>の「MailAttachments」フォルダに<br><b>${count} 個</b> のファイルを保存しました。`
  },
  en: {
    title: "Save Complete (by K-tech Studio)",
    msg: `Saved <b>${count}</b> files to the "MailAttachments" folder on your <b>Desktop</b>.`
  },
  zh: {
    title: "保存完成 (by K-tech Studio)",
    msg: `已将 <b>${count}</b> 个文件保存到<b>桌面</b>的 "MailAttachments" 文件夹中。`
  },
  fr: {
    title: "Enregistrement terminé (by K-tech Studio)",
    msg: `<b>${count}</b> fichiers ont été enregistrés dans le dossier "MailAttachments" sur votre <b>Bureau</b>.`
  }
};

// 該当する言語がない場合は英語(en)をデフォルトにする
const t = translations[lang.substring(0, 2)] || translations.en;

// 画面に反映
if (titleElem) titleElem.textContent = t.title;
if (msgElem) msgElem.innerHTML = t.msg;

/**
 * OKボタンのクリックイベント
 */
document.getElementById('okBtn').addEventListener('click', async () => {
    try {
        const currentWin = await browser.windows.getCurrent();
        await browser.windows.remove(currentWin.id);
    } catch (e) {
        console.error("Close failed:", e);
        window.close();
    }
});