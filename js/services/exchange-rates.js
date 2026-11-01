const ENDPOINT = 'https://open.er-api.com/v6/latest/PKR';

export function ratesDue(settings) {
  if (settings?.automaticRates === false) return false;
  return !settings?.fxRates?.retrievedAt || Date.now() >= Number(settings.fxRates.nextUpdateAt || 0);
}

export async function fetchRates(fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== 'function') throw new Error('Exchange-rate provider is unavailable.');
  const response = await fetchImpl(ENDPOINT, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Exchange-rate provider returned ${response.status}.`);
  const payload = await response.json();
  if (payload?.result !== 'success' || payload?.base_code !== 'PKR' || !payload?.rates || typeof payload.rates !== 'object') throw new Error('Exchange-rate provider returned an invalid response.');
  const rates = Object.fromEntries(Object.entries(payload.rates).filter(([, value]) => Number.isFinite(Number(value)) && Number(value) > 0));
  if (!rates.PKR) rates.PKR = 1;
  return { rates, provider: 'ExchangeRate-API', retrievedAt: new Date().toISOString(), publishedAt: payload.time_last_update_utc || null, nextUpdateAt: payload.time_next_update_unix ? Number(payload.time_next_update_unix) * 1000 : Date.now() + 86400000 };
}
