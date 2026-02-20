## 💬 討論串

> **A**
> 請問 AI Agents 對於 GAS 的掌握度是不是遠高於 gog？
> 畢竟 gog 才剛出，應該還沒進 pre-training dataset。
> 如果要 Agent 寫 gog 指令，感覺幻覺 (Hallucination) 風險會很高，
> 除非把整份 doc 塞進 Context 裡？

---

> **B**
> 熟幾個範例他就學會了

---

> **C**
> 給 agent 看 GitHub 就會使用，這不用擔心。

---

> **D**
> opensource 直接給他 github 連結 他就會了

AI 對成熟技術（如 GAS）的掌握度通常遠高於新工具（如 gog）

你的推論其實是合理的，我分幾個層次幫你拆解。

---

## 一、什麼是 GAS？

**GAS = Google Apps Script**

Google Apps Script 是 Google 提供的雲端 JavaScript 執行環境，主要用來自動化：

* Google Sheets
* Google Docs
* Gmail
* Google Drive
* Google Forms

### 特點

* 基於 JavaScript
* API 穩定且存在多年
* StackOverflow / GitHub / 部落格資料很多
* 官方文件成熟

👉 因為存在很久，**公開資料極多**，所以 AI 在 pre-training 階段「看過」的機率非常高。

---

## 二、什麼是 gog？
https://github.com/steipete/gogcli.git

gogcli（簡稱 gog）是由 Peter Steinberger 開發的開源命令列工具，專為 Google Workspace 打造單一二進位檔案解決方案。它統一管理 Gmail、Calendar、Drive、Sheets、Docs、Slides、聯絡人、任務與 People 等服務，支持多帳戶切換、JSON 輸出、Pub/Sub 即時監聽，以及最小權限 OAuth 驗證，讓使用者透過終端高效處理 Google 生態。
核心特色包括高槓桿指令設計，如搜尋 Gmail 未讀郵件 `gog gmail search 'is:unread newer_than:7d'`，或匯出 Sheets 為 PDF `gog sheets export <spreadsheetId> --format pdf`。安裝簡單，透過 Homebrew `brew install steipete/tap/gogcli` 即可，設定僅需下載 `client_secret.json` 並執行 `auth` 指令，即可快速啟用腳本自動化與生產力工作流程。



## 三、為什麼 AI 對 GAS 掌握度高？

因為：

* 發布時間長
* 大量教學文章
* StackOverflow QA 多
* 官方 API 穩定
* GitHub 範例多

所以模型在訓練時已經看過大量：

* `SpreadsheetApp`
* `GmailApp`
* `DriveApp`
* `onEdit(e)` trigger
* WebApp deployment

👉 幻覺風險低。

---

