export const Schema = z.object({
  系统: z.object({
    日期: z.string().prefault('2026/07/01'),
    时间段: z.enum(['早晨', '下午', '傍晚', '夜晚', '深夜']).prefault('早晨'),
    当前位置: z.enum(['合租公寓', '街区周边']).prefault('合租公寓'),
  }).prefault({}),
  Jason: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    关系阶段: z.enum(['室友', '朋友', '暧昧', '恋人']).prefault('室友'),
  }).prefault({}),
  Ethan: z.object({
    金钱: z.coerce.number().prefault(5000),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
