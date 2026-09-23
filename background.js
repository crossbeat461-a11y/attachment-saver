/** Multi-Attachment Saver 6.7 */
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
 * フォルダ名に使えない文字を除去し、長さを制限する
 * @param {string} text
 * @returns {string}
 */
function sanitizeFolderPart(text) {
  if (!text || typeof text !== "string") {
    return "";
  }
  return text
    .replace(/[\\/:*?"<>|\r\n]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48);
}

/**
 * 完了ポップアップを開く
 * @param {number} savedCount
 * @param {string} reason - ok | no_message | no_attachments
 */
async function showFinishPopup(savedCount, reason) {
  const params = new URLSearchParams({
    count: String(savedCount),
    reason: reason || "ok"
  });
  await browser.windows.create({
    url: `finish.html?${params.toString()}`,
    type: "popup",
    width: 450,
    height: reason === "ok" ? 260 : 280
  });
}

/**
 * 添付ファイルの保存処理を実行
 * @param {Object} tab - 実行対象のタブオブジェクト
 */
async function runSave(tab) {
  try {
    const message = await browser.messageDisplay.getDisplayedMessage(tab.id);
    if (!message) {
      console.warn("No message displayed in the active tab.");
      await showFinishPopup(0, "no_message");
      return;
    }

    const now = new Date();
    const timestamp =
      now.getFullYear() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      "_" +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const subjectPart = sanitizeFolderPart(message.subject);
    const folderName = subjectPart
      ? `MailAttachments_${timestamp}_${subjectPart}`
      : `MailAttachments_${timestamp}`;

    const attachments = await browser.messages.listAttachments(message.id);
    if (!attachments || attachments.length === 0) {
      console.info("No attachments found in the message.");
      await showFinishPopup(0, "no_attachments");
      return;
    }

    let savedCount = 0;
    for (const att of attachments) {
      const fileData = await browser.messages.getAttachmentFile(message.id, att.partName);
      const objectUrl = URL.createObjectURL(fileData);

      try {
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
        setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      }
    }

    const finishReason = savedCount > 0 ? "ok" : "failed";
    await showFinishPopup(savedCount, finishReason);
  } catch (e) {
    console.error("Critical Error in runSave:", e);
    await showFinishPopup(0, "no_message");
  }
}

browser.browserAction.onClicked.addListener(runSave);

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-all") {
    runSave(tab);
  }
});

window.runSave = runSave;
