/**
 * 右クリックメニュー（コンテキストメニュー）の設定
 */
browser.menus.removeAll().then(() => {
  browser.menus.create({
    id: "save-all",
    title: browser.i18n.getMessage("contextMenuTitle") || "一括保存",
    contexts: ["all"]
  });
});

/**
 * 添付ファイルの保存処理を実行
 * @param {Object} tab - 実行対象のタブオブジェクト
 */
async function runSave(tab) {
  try {
    // 表示中のメッセージを取得
    const message = await browser.messageDisplay.getDisplayedMessage(tab.id);
    if (!message) {
      console.warn("No message displayed in the active tab.");
      return;
    }

    // タイムスタンプの生成（フォルダ名用）
    const now = new Date();
    const timestamp = now.getFullYear() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) + "_" +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const folderName = `MailAttachments_${timestamp}`;

    // 添付ファイルリストの取得
    const attachments = await browser.messages.listAttachments(message.id);
    if (!attachments || attachments.length === 0) {
      console.info("No attachments found in the message.");
      return;
    }

    let savedCount = 0;
    for (let att of attachments) {
      // 添付ファイルデータをBlobとして取得
      const fileData = await browser.messages.getAttachmentFile(message.id, att.partName);
      const objectUrl = URL.createObjectURL(fileData);

      try {
        // ダウンロード実行
        await browser.downloads.download({
          url: objectUrl,
          filename: folderName + "/" + att.name,
          saveAs: false,
          conflictAction: "uniquify"
        });
        savedCount++;
      } catch (downloadErr) {
        console.error(`Download failed for ${att.name}:`, downloadErr);
      } finally {
        // ダウンロード要求が受理された後、メモリ解放のためにURLを破棄
        // （即時だと失敗する場合があるため、わずかに遅延させる）
        setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      }
    }

    // 保存完了画面（finish.html）をポップアップウィンドウで表示
    await browser.windows.create({
      url: `finish.html?count=${savedCount}`,
      type: "popup",
      width: 450,
      height: 260
    });

  } catch (e) {
    console.error("Critical Error in runSave:", e);
  }
}

/**
 * イベントリスナーの登録
 */

// 1. ツールバーのボタン（browser_action）クリック時
browser.browserAction.onClicked.addListener(runSave);

// 2. コンテキストメニュークリック時
browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-all") {
    runSave(tab);
  }
});

// 3. popup.js から呼び出せるようにグローバルへ公開
window.runSave = runSave;