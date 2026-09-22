# Multi-Attachment Saver

Thunderbird add-on that saves every attachment from the message you are reading into one folder.

**Repository:** https://github.com/crossbeat461-a11y/attachment-saver  
**Install (recommended):** [Thunderbird Add-ons — Multi-Attachment Saver](https://addons.thunderbird.net/ja/thunderbird/addon/multi-attachment-saver/)  
**Landing page:** https://attachment-lp.vercel.app/  
**Homepage:** https://k-tech-lab.vercel.app/

| | |
| --- | --- |
| Version | 6.5 |
| Thunderbird | 115.0 or later |
| Add-on ID | `K-saver@k-tech-studio.com` |
| License | [Mozilla Public License 2.0](LICENSE) |

---

## English

### What it does

Open a message in Thunderbird, then:

- Click the toolbar button, or  
- Use the context menu **Save all attachments in bulk**, or  
- Open the popup and click **Save attachments in bulk**

All attachments in that message are downloaded under a folder named like `MailAttachments_YYYYMMDD_HHMMSS/` (via the browser download settings). A small popup shows how many files were saved.

UI strings: Japanese, English, German, Spanish, French, Korean, Simplified Chinese (`_locales/`).

### Install from source (developers)

1. Clone this repository.
2. In Thunderbird: **Add-ons and Themes** → gear → **Debug Add-ons** → **Load Temporary Add-on** → select `manifest.json`.
3. For everyday use, install the signed build from [Thunderbird Add-ons](https://addons.thunderbird.net/en-US/thunderbird/addon/multi-attachment-saver/) instead.

### Report issues

Open a [GitHub Issue](https://github.com/crossbeat461-a11y/attachment-saver/issues/new) with Thunderbird version, OS, and steps to reproduce.

---

## 日本語

### 機能

Thunderbird でメールを開いた状態で、次のいずれかから実行します。

- ツールバーのボタン  
- 右クリックメニュー「すべての添付ファイルを一括保存」  
- ポップアップの「添付ファイルを一括保存」

**表示中のメール 1 通**の添付を、`MailAttachments_YYYYMMDD_HHMMSS` のようなフォルダ名の下にまとめて保存します（保存先は Thunderbird / ブラウザのダウンロード設定に従います）。完了件数は小さなポップアップで表示します。

表示言語: 日・英・独・西・仏・韓・簡体字中国語（`_locales/`）。

### ソースから試す（開発者向け）

1. このリポジトリを clone する。  
2. Thunderbird: **アドオンとテーマ** → 歯車 → **デバッグアドオン** → **一時的なアドオンを読み込む** → `manifest.json` を指定。  
3. 日常利用は署名済み版を [Thunderbird アドオン](https://addons.thunderbird.net/ja/thunderbird/addon/multi-attachment-saver/) から入れてください。

### 不具合・要望

[GitHub Issues](https://github.com/crossbeat461-a11y/attachment-saver/issues) に、Thunderbird の版、OS、再現手順を書いてください。

---

## Author

K-Tech Studio — https://k-tech-lab.vercel.app/
