// Brandad e-postlayout för orderbekräftelser (matchar välkomstmailet):
// cream bakgrund, vitt kort, brun→oliv gradient-header och serif-rubrik.
// Värden som skickas in ska redan vara HTML-escapade av anroparen.

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

export function orderEmailShell(opts: {
  heading: string;
  intro: string;
  body: string;
}) {
  return `
  <div style="background:#f3ece0;margin:0;padding:32px 16px;font-family:${FONT}">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 34px rgba(42,32,24,0.10)">
      <div style="background:linear-gradient(135deg,#3a3128 0%,#6B7B4B 100%);padding:34px 32px;text-align:center">
        <p style="margin:0;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#e7c9a0">Smilo</p>
        <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:600;line-height:1.25;color:#fdf8ef">${opts.heading}</h1>
      </div>
      <div style="padding:30px 32px 34px">
        <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#4a443d">${opts.intro}</p>
        ${opts.body}
      </div>
    </div>
    <p style="max-width:560px;margin:18px auto 0;text-align:center;font-size:11px;color:#b3a995">Smilo · Designad i Sverige</p>
  </div>`;
}

export function orderDetailRows(rows: Array<[string, string]>) {
  const cells = rows
    .map(([label, value], i) => {
      const border = i ? 'border-top:1px solid #efe9df;' : '';
      return `<tr>
        <td style="padding:11px 0;${border}color:#8a8178;vertical-align:top;width:40%">${label}</td>
        <td style="padding:11px 0 11px 14px;${border}color:#2a2018;font-weight:500;text-align:right;vertical-align:top;word-break:break-word">${value}</td>
      </tr>`;
    })
    .join('');
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${cells}</table>`;
}

export function orderTotalBox(total: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;margin-top:18px;background:#f4f1e8;border-radius:14px">
    <tr>
      <td style="padding:16px 20px;color:#6B7B4B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px">Totalt betalt</td>
      <td style="padding:16px 20px;text-align:right;font-size:22px;font-weight:700;color:#3a3128">${total}</td>
    </tr>
  </table>`;
}
