import { useEffect, useState } from 'react';
import { fetchColors, Color } from '../utils/colors';

export function useColor() {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadColors() {
      setLoading(true);
      const fetchedColors: Color[] = await fetchColors();

      const colorsObject = fetchedColors.reduce((acc, { id, hex }) => {
        acc[id] = hex;
        return acc;
      }, {} as Record<string, string>);

      setColors(colorsObject);
      setLoading(false);
    }

    loadColors();
  }, []);

  return { colors, loading };
}
