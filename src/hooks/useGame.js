import { useEffect, useState } from 'react';

export function useGame() {
  const [board, setBoard] = useState(Array(9).fill(null));

  useEffect(() => {}, [board, setBoard]);
  return { board, setBoard };
}
