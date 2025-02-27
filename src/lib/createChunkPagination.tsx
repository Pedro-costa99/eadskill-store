export function createChunkPagination<T>({
  results,
  size,
}: {
  results: T[];
  size: number;
}): T[][] {
  try {
    return results.reduce<T[][]>((acc, item, index) => {
      const chunkIndex = Math.floor(index / Number(size));
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [item];
      } else {
        acc[chunkIndex].push(item);
      }
      return acc;
    }, []);
  } catch {
    return [];
  }
}
