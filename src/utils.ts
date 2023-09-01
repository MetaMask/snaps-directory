export type Fields<Query, Name extends keyof Query> = {
  [Key in Name]: Query[Key] extends Queries.Maybe<infer Inner> ? Inner : never;
};
