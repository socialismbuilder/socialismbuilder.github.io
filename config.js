// 配置多个 AI 模型供选择，字段说明：
// displayName: 前端显示的名称，可与 model 字段不同。
// model: 实际发送调用 API 时的模型标识。
// host: 基础 URL（注意最后不带斜杠）。
// endpoint: API 请求的路径（需以 / 开头）。
// apiKey: 替换为你实际的 API Key

window.AI_CONFIG = [
  {
    displayName: "DeepSeek-R1",
    model: "ep-20250224204329-xxh8m",
    host: "https://ark.cn-beijing.volces.com/api/v3",
    endpoint: "/chat/completions",
    apiKey: "ee830a48-64ea-41ae-8d0e-ec4205da816e"
  }
  // 你也可以在此追加其他模型的配置
];
