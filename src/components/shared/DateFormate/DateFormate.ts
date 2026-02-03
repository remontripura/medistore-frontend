export function formatDate(dateString: string | undefined): string {
  const date = dateString ? new Date(dateString) : new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12; // the hour '0' should be '12'

  const hoursStr = String(hours).padStart(2, '0');

  return `${day}-${month}-${year}, ${hoursStr}.${minutes} ${ampm}`;
}
