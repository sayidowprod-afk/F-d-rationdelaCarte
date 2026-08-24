// Géocode une ville française via l'API officielle geo.api.gouv.fr
// (gratuite, sans clé, gouvernementale). Retourne null si la ville n'est
// pas reconnue.
export async function geocodeFrenchCity(
  city: string
): Promise<{ latitude: number; longitude: number } | null> {
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
    city
  )}&fields=centre&boost=population&limit=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const results: Array<{ centre: { coordinates: [number, number] } }> =
      await res.json();
    const first = results[0];
    if (!first) return null;
    const [longitude, latitude] = first.centre.coordinates;
    return { latitude, longitude };
  } catch {
    return null;
  }
}
