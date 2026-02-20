# ai-note

![](https://jackwio.github.io/my-github-pages/ai-note.png)

以 VitePress 建立的技術筆記站，內容放在 `docs/`。

## 本機開發

```bash
npm install
npm run dev
```

Build：

```bash
npm run build
```

## 專案筆記實作方式

- 所有筆記 Markdown 放在 `docs/`。
- `docs/.vitepress/config.ts` 會在啟動/build 時掃描檔案系統，自動組出 sidebar。
- GitHub Actions 會在 `main` 有新 commit 時自動 build 與部署到 GitHub Pages（`.github/workflows/deploy-docs.yml`）。

## Sidebar Item 形成規則

對應程式位置：`docs/.vitepress/config.ts`

1. 掃描 `docs/`，忽略隱藏檔案/資料夾與 `.vitepress`。
2. 支援遞迴子資料夾（多層資料夾）。
3. 每個資料夾都會被建立成一個群組（即使只有 `overview.md`）。
4. 每個資料夾內的 `.md` 會變成 item 連結。
5. 根目錄 `index.md` 不放入 sidebar（首頁仍可由 `/` 進入）。
6. 根目錄其他 `.md`（例如 `promptfile.md`）會放在「根目錄」群組。
7. 目錄與檔案會以 `zh-Hant` locale 做排序。
8. 根層資料夾群組預設為收合（collapsed）。
9. 所有資料夾與子資料夾都可收合（collapsible）。

## 資料夾收合設定

目前設定為：

- 根層資料夾：`collapsible: true`，預設收合（可用 `expandedTopLevelDirs` 白名單展開）。
- 子層資料夾：`collapsible: true`，預設展開（可由使用者手動收合）。
- 「根目錄」群組：`collapsible: true`，預設展開。

- 設定位置：`docs/.vitepress/config.ts`
- 變數：`expandedTopLevelDirs`

若你想讓特定資料夾預設展開，可加入白名單：

```ts
const expandedTopLevelDirs = new Set<string>(['Copilot'])
```

## License

MIT，詳見 `LICENSE`。
