/**
 * ポップアップ初期化処理：多言語テキストの反映
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    // messages.json から現在の言語設定に合わせたテキストを取得
    const extName = browser.i18n.getMessage("extensionName");
    const actionTitle = browser.i18n.getMessage("actionTitle");

    // HTML要素に反映
    if (extName) {
      const extNameElem = document.getElementById('extName');
      if (extNameElem) extNameElem.textContent = extName;
    }
    
    if (actionTitle) {
      const saveBtnElem = document.getElementById('saveBtn');
      if (saveBtnElem) saveBtnElem.textContent = actionTitle;
    }
  } catch (e) {
    console.error("Initialization Error:", e);
  }
});

/**
 * ポップアップ内の「一括保存」ボタンのクリックイベント
 */
document.getElementById('saveBtn').addEventListener('click', async () => {
  try {
    // 現在アクティブなタブを取得
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (tabs.length > 0) {
      // background.js のインスタンスを取得
      const bg = await browser.runtime.getBackgroundPage();
      
      // background.js 内で定義されている runSave 関数を実行
      // 実行後はポップアップを閉じる
      if (bg && typeof bg.runSave === 'function') {
        bg.runSave(tabs[0]);
        window.close();
      } else {
        console.error("Background function 'runSave' not found.");
      }
    }
  } catch (e) {
    console.error("Popup Click Error:", e);
  }
});