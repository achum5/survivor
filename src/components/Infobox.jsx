// src/components/Infobox.jsx

export default function Infobox({ title, headerColor = '#e74c3c', rows, image }) {
  // rows: [{ label, value }]
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th
            colSpan={2}
            className="infobox-header"
            style={{ background: headerColor }}
          >
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'infobox-row even' : 'infobox-row odd'}>
            <td className="infobox-label">{row.label}</td>
            <td className="infobox-value">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
