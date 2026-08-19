// dsh-brand-identity — 品牌设计：品牌要素与体系。纯 Node 知识库。
import { defineTool } from "@deepseek-ai/dsh-tools";

const name = "品牌设计";
const inject = ["tools"];

const ELEMENTS = [
  { id: "logo", name: "Logo 标志", desc: "品牌核心符号，需在多种尺寸/背景下可用。", deliver: "主标、反白、单色、favicon、app 图标" },
  { id: "color", name: "品牌色", desc: "传递品牌调性，通常 1 主色 + 2-3 辅助色 + 中性色。", deliver: "色板、色值（hex/rgb/cmyk）、使用占比" },
  { id: "typography", name: "字体", desc: "主字体 + 备选字体，含标题与正文两套。", deliver: "字族、字重、字号阶梯、行距规范" },
  { id: "voice", name: "品牌语气", desc: "文案的说话方式，塑造人格（专业/亲切/幽默）。", deliver: "语气指南、示例文案、禁用语" },
  { id: "imagery", name: "视觉风格", desc: "图片/插画/图标风格，统一视觉语言。", deliver: "摄影风格、插画规范、图标库" },
  { id: "layout", name: "版式规范", desc: "栅格、留白、构图规则，保证各触点一致。", deliver: "栅格模板、页面模板、间距规则" },
  { id: "motion", name: "动效", desc: "品牌动态语言，用于过渡、微交互与视频。", deliver: "缓动曲线、时长规范、动效示例" },
];

const GUIDELINES = [
  { id: "consistency", name: "一致性", desc: "所有触点上品牌表达一致，是建立认知的关键。" },
  { id: "memorable", name: "可记忆", desc: "独特、简洁、易于识别与回想。" },
  { id: "scalable", name: "可扩展", desc: "logo 与规范能适应小尺寸、单色、未来扩展。" },
  { id: "appropriate", name: "匹配定位", desc: "视觉与语气贴合品牌人群、行业与价值观。" },
  { id: "flexible", name: "有弹性", desc: "规范提供原则而非死板限制，允许合理变化。" },
];

async function apply(ctx, _config) {
  ctx.tools.register(defineTool({
    name: "list_brand_elements",
    description: "列出品牌视觉识别体系的要素（Logo/品牌色/字体/语气/视觉风格/版式/动效），含说明与交付物。",
    parameters: {},
    output: {
      schema: {
        type: "object", additionalProperties: false,
        properties: {
          count: { type: "integer", required: true },
          elements: { type: "array", required: true, items: { type: "object", additionalProperties: false, properties: { id: { type: "string", required: true }, name: { type: "string", required: true }, desc: { type: "string", required: true }, deliver: { type: "string", required: true } } } },
        },
      },
      render: (_a, v) => [{ type: "text", text: v.elements.map((e) => `- ${e.name}：${e.desc}。交付物：${e.deliver}`).join("\n") }],
    },
    execute: async () => ({ count: ELEMENTS.length, elements: ELEMENTS.map((e) => ({ ...e })) }),
  }));

  ctx.tools.register(defineTool({
    name: "brand_guideline_principles",
    description: "返回品牌设计五原则（一致性/可记忆/可扩展/匹配定位/有弹性）。",
    parameters: {},
    output: {
      schema: {
        type: "object", additionalProperties: false,
        properties: { principles: { type: "array", required: true, items: { type: "object", additionalProperties: false, properties: { id: { type: "string", required: true }, name: { type: "string", required: true }, desc: { type: "string", required: true } } } } },
      },
      render: (_a, v) => [{ type: "text", text: v.principles.map((p) => `- ${p.name}：${p.desc}`).join("\n") }],
    },
    execute: async () => ({ principles: GUIDELINES.map((p) => ({ ...p })) }),
  }));
}

export { apply, inject, name };
