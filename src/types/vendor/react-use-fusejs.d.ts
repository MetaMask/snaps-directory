// eslint-disable-next-line import/unambiguous
declare module 'react-use-fusejs' {
  export function useGatsbyPluginFusejs<Type = unknown>(
    query: string,
    fuse: {
      data: Record<string, unknown>;
      index: string;
    },
    fuseOptions?: {
      threshold: number;
      distance: number;
    },
  ): { item: Type }[];
}
