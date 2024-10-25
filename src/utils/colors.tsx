import axios from 'axios';

export interface Color {
  id: string;
  hex: string;
}

let cachedColors: Color[] = [];

export async function fetchColors(): Promise<Color[]> {
  if (cachedColors.length > 0) {
    return cachedColors;
  }

  try {
    const response = await axios.get<{ color: Color[] }>('https://financeapp-xtt2.onrender.com/colors');
    const data = response.data;

    if (!data || !Array.isArray(data.color)) {
      console.error('Erro: A resposta do backend não contém um array válido:', data);
      return [];
    }

    cachedColors = data.color;
    return cachedColors;
  } catch (error) {
    console.error('Erro ao buscar as cores do backend:', error);
    return [];
  }
}
