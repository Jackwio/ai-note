# 🔹 POCO 是什麼？

> Plain Old CLR Object

這是 .NET 世界的名詞。

---

## 🔹 定義

POCO =

> 不依賴框架
> 不繼承特定 base class
> 不需要特殊 attribute 才能存在的純物件

---

## 🔹 範例

### ❌ 非 POCO

```csharp
public class User : Entity<Guid>
{
}
```

依賴框架 Entity

---

### ✅ POCO

```csharp
public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
```

這種 class：

* 不繼承 framework
* 不耦合 ORM
* 可單元測試

---

## 🔹 為什麼重要？

在：

* DDD
* Clean Architecture
* Onion Architecture

我們希望：

> Domain Model 是 POCO

這樣可以：

* 不依賴 EF Core
* 不依賴 ASP.NET
* 可純記憶體測試