// ═══ Homie Schema v2.0 ═══
// v2.0: 系统加 今日安排；Jake 加 订阅数/直播状态；user 加 SNS粉丝数/委托；新增 日程.本周特殊事项、UID计数器
// v1.0: 初版（系统三字段 + Jake 四字段 + user 两字段）
export const Schema = z.object({
  系统: z.object({
    日期: z.string().prefault('2026/07/08'),
    时间段: z.string().prefault('下午'),
    当前场景: z.string().prefault('合租公寓'),
    今日安排: z.string().prefault(''),
  }).prefault({}),
  Jake: z.object({
    关系阶段: z.enum(['重逢期', '挣扎期', '面对期']).prefault('重逢期'),
    觉察度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    冷热状态: z.enum(['热', '正常', '冷']).prefault('正常'),
    对user的依赖度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(10),
    订阅数: z.coerce.number().transform(v => Math.max(0, Math.round(v))).prefault(480000),
    直播状态: z.enum(['直播中', '未开播', '已下播', '今日不播']).prefault('今日不播'),
  }).prefault({}),
  user: z.object({
    疲惫值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    离开决心: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    SNS粉丝数: z.coerce.number().transform(v => Math.max(0, Math.round(v))).prefault(2300),
    委托: z.record(z.string(), z.object({
      客户: z.string().prefault(''),
      内容: z.string().prefault(''),
      类型: z.enum(['商稿', '个人委托', 'Jake直播间']).prefault('个人委托'),
      酬劳: z.coerce.number().transform(v => Math.max(0, Math.round(v))).prefault(0),
      截稿日: z.string().prefault(''),
      状态: z.enum(['进行中', '已完成', '已逾期', '已取消']).prefault('进行中'),
    })).prefault(() => ({})),
  }).prefault({}),
  日程: z.object({
    本周特殊事项: z.array(z.string()).prefault(() => []),
  }).prefault({}),
  UID计数器: z.record(z.string(), z.coerce.number()).prefault(() => ({})),
});
export type Schema = z.output<typeof Schema>;
