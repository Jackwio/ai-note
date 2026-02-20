在軟體開發中，**TDD** 與 **BDD** 是兩種非常重要且經常被相提並論的開發方法論。簡單來說，它們都是為了「先寫測試，再寫程式」，但關注點完全不同。

---

### 1. TDD (Test-Driven Development)

**測試驅動開發**

* **核心目標：** 確保程式碼「正確地執行」（Implementation Correctness）。
* **關注對象：** 開發人員。
* **運作邏輯：**
1. **Red (紅燈)：** 先寫一個會失敗的單元測試（Unit Test）。
2. **Green (綠燈)：** 寫出最簡單、能讓測試通過的程式碼。
3. **Refactor (重構)：** 在保持測試通過的前提下，優化程式碼品質。


* **特色：** 非常精細，通常針對單一函數或類別進行驗證。

---

### 2. BDD (Behavior-Driven Development)

**行為驅動開發**

* **核心目標：** 確保程式碼「執行了正確的事」（Business Value）。
* **關注對象：** 開發人員、測試人員 (QA)、業務人員 (PO/PM)。
* **運作邏輯：** 它是 **SBE (Specification by Example)** 的具體實踐方式。使用人類可讀的語言（通常是 Given/When/Then 語法）來描述使用者的行為場景。
* **特色：** 強調「協作」，讓不懂技術的業務人員也能看懂測試規格。

---

### 3. TDD vs. BDD 快速對比

| 特性 | TDD | BDD |
| --- | --- | --- |
| **全稱** | Test-Driven Development | Behavior-Driven Development |
| **重點** | **怎麼做** (How) - 實作細節 | **做什麼** (What) - 業務行為 |
| **語言** | 程式語言 (如 Java, Python, C#) | 自然語言 (如 繁體中文, 英文) |
| **溝通層次** | 工程師之間 | 跨角色 (PM, Dev, QA) |
| **常見工具** | JUnit, PyTest, NUnit | Cucumber, SpecFlow, Behave |

---

### 總結它們的關係

你可以想像 **BDD 是 TDD 的進化版**，或是大範圍的包裝：

* **BDD** 告訴你：「我們需要一個讓使用者登入的功能」。
* **TDD** 告訴你：「在登入功能內部，驗證密碼雜湊值的函式應該回傳 True」。

根據您圖片中的規範，**Specifications (規格)** 必須使用繁體中文，這正是 **BDD** 的強項——您可以用繁體中文撰寫行為規格（Scenario），然後讓開發者在程式碼註解（可以使用英文）中實現它。

您是否想看看如何用 **Given / When / Then** 語法為您的專案撰寫一個繁體中文的 BDD 範例？