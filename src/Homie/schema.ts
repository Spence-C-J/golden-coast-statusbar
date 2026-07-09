export const Schema = z.object({
  系统: z.object({
    日期: z.string().prefault('2026/07/08'),
    时间段: z.string().prefault('下午'),
    当前场景: z.string().prefault('合租公寓'),
  }).prefault({}),
  Jake: z.object({
    关系阶段: z.enum(['重逢期', '挣扎期', '面对期']).prefault('重逢期'),
    觉察度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    冷热状态: z.enum(['热', '正常', '冷']).prefault('正常'),
    对user的依赖度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(10),
  }).prefault({}),
  user: z.object({
    疲惫值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    离开决心: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
