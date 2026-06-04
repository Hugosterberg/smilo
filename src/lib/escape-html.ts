// Escapar HTML-specialtecken så att användarstyrd text kan interpoleras säkert
// i e-postmallar utan injektion eller trasig layout.
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
