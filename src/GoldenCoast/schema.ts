export const Schema = z.object({
  系统: z.object({
    日期: z.string().prefault('2026/06/21'),
    时间段: z.string().prefault('下午'),
    当前位置: z.string().prefault('金景高地'),
  }).prefault({}),
  Nathan: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
  }).prefault({}),
  玩家: z.object({
    金钱: z.coerce.number().prefault(3000),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
