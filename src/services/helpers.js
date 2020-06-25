export function formatDate(date, long=false) {
  const d = date.split(/[^0-9]/);
  const options = {
    month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  };

  if (long) { options['weekday'] = 'long'; }

  return new Date(d[0], d[1]-1, d[2], d[3], d[4]).toLocaleDateString(
    "es-ES", options
  );
}
