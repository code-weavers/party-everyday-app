export function formatBRDate(date: string): string {
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });
}