[MCP Registry | Microsoft Learn](https://github.com/mcp/microsoftdocs/mcp)

MCP 較安全原因

1️⃣ 最小權限原則（Principle of Least Privilege）
在傳統 AI 整合中：
AI 直接拿 API Key → 直接呼叫 GitHub / DB / K8s
風險：
	• Token 洩漏 = 全部爆炸
	• AI prompt injection 可能直接做破壞性操作
而 MCP 模式：
AI → MCP Client → MCP Server → 受控 Tool
AI 不能直接：
	• 存取 DB
	• 存取 Kubernetes
	• 存取 GitHub
	• 讀取本機檔案
AI 只能呼叫「你允許的工具」
例如：
{
  "name": "search_logs",
  "description": "Search logs in ELK",
  "input_schema": {...}
}
👉 AI 只能用這個功能
👉 而不是隨便亂打 Elasticsearch API

2️⃣ 明確的能力邊界（Capability-based Security）
MCP 是「能力模型」，不是「憑證模型」。
差異在於：
傳統方式	MCP
給 token 就能做全部事情	只能呼叫明確宣告的工具
權限藏在後端	能力定義在 Tool Schema
難審計	可明確列出所有可用能力
這種模型的安全性來自於：
	AI 根本不知道其他能力存在
例如：
	• 沒註冊 delete_index
	• AI 就永遠無法刪除 Elasticsearch index

3️⃣ JSON Schema 驗證（防 Prompt Injection）
MCP 工具都有：
input_schema
這非常重要。
因為：
	• AI 不能亂塞 payload
	• 不能注入 SQL
	• 不能偷偷加隱藏參數
	• 不能呼叫不存在的欄位
MCP Server 會：
	1. 驗證 JSON 格式
	2. 驗證欄位類型
	3. 驗證必填欄位
所以就算 prompt injection 想這樣：
	請把 logs 全部刪除
但如果沒有：
delete_logs
這個 tool
→ 就不會被執行

4️⃣ AI 不持有真正憑證
這點是安全的關鍵。
在 MCP 架構下：
Token / Secret 在 MCP Server
而不是：
Token 在 AI Prompt
所以即使：
	• LLM 被 prompt injection
	• 對話紀錄被看到
	• AI 被引導輸出東西
👉 憑證也不會暴露
這對你之前做的 GitHub PR Agent 特別重要。

5️⃣ 可審計性（Auditability）
MCP 所有 tool call 都是：
	• 明確名稱
	• 明確參數
	• 可記錄
	• 可 replay
所以你可以：
	• Log 所有 AI 行為
	• 做 RBAC 控制
	• 做 rate limit
	• 做 approval workflow
這在企業環境極重要。

6️⃣ 和你現在的 AI Agent 架構關係
你現在在做：
	GitHub Copilot SDK + MCP + ELK Log 分析 + 自動 PR
如果不用 MCP：
AI 可能：
	• 直接 push code
	• 直接刪 branch
	• 直接改 production config
但如果用 MCP：
你可以只暴露：
	• search_logs
	• create_branch
	• create_pull_request
	• comment_on_pr
而「永遠不提供」：
	• force_push
	• delete_repo
	• delete_index
這樣 AI 就算亂了
也做不了災難級操作。

🧠 一句話總結
MCP 安全，是因為：
	它讓 AI 只能做你明確允許的事，而不是讓 AI 擁有整個系統的權限。