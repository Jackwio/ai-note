# SDD + Spec Kit + Plan mode 跟本是絕配！
## 心得：**拿 Plan mode 的結果**當作 /speckit.specify 的 spec-context 來用，超強！

https://sdd.gh.miniasp.com/labs/

https://sdd.gh.miniasp.com/labs/ai-agent

https://sdd.gh.miniasp.com/labs/claude-projects

https://gist.github.com/doggy8088/e7c823105455b1733e51dceca8a43175


建立一個 AGENTS.md 檔案 (給 Copilot CLI 看的)

檔案內容如下：

We're going to be using slash command from `.github\prompts\`
加入版控：

git add AGENTS.md && git commit -m "Add AGENTS.md"


https://jamespolik.pixnet.net/blog/posts/17347759770


SRP 簡單來說，就是相關的東西放一起。相似的規格可以一起做掉。
當 spec.md 建立完成後，可以直接對 spec.md 進行調整，可以不用再次下達 /speckit.specify 斜線命令。

寫規格時，脈絡沒有很重要（並不是不重要），因為真正的脈絡都在人類的腦子裡
大家都公認 Claude 的模型很會寫文件，而 GPT-5 則是比較重分析脈絡

我最近的做法是拿 Azure DevOps Wiki 來寫 Spec，用 Git submodule 塞進專案裡方便開發時取用
讓人類跟 AI 看同一份 Spec

speckit 就缺這個 每個模組功能永遠對應一份 主線規格，得要自己處理(openspec 有)
其實我是很希望保哥開openspec的，我是打算speckit+openspec 混用XD

/savePrompt