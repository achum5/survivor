// src/components/Infobox.jsx
import { Link } from 'react-router-dom';

export default function Infobox({ title, headerColor = '#e74c3c', rows, logo, castPhoto, chronology }) {
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th colSpan={2} className="infobox-header" style={{ background: headerColor }}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Logo */}
        {logo && (
          <tr>
            <td colSpan={2} className="infobox-logo-cell">
              <img src={logo} alt={`${title} logo`} className="infobox-logo-img" />
            </td>
          </tr>
        )}

        {/* Season Information sub-header */}
        {rows.length > 0 && (
          <tr>
            <td colSpan={2} className="infobox-section-header">Season Information</td>
          </tr>
        )}

        {/* Rows */}
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'infobox-row even' : 'infobox-row odd'}>
            <td className="infobox-label">{row.label}</td>
            <td className="infobox-value">{row.value}</td>
          </tr>
        ))}

        {/* Cast Photo */}
        {castPhoto && (
          <>
            <tr>
              <td colSpan={2} className="infobox-section-header">Cast</td>
            </tr>
            <tr>
              <td colSpan={2} className="infobox-cast-cell">
                <img src={castPhoto} alt={`${title} cast`} className="infobox-cast-img" />
              </td>
            </tr>
          </>
        )}

        {/* Season Chronology */}
        {chronology && (chronology.prev || chronology.next) && (
          <>
            <tr>
              <td colSpan={2} className="infobox-section-header">Season Chronology</td>
            </tr>
            <tr>
              <td colSpan={2} className="infobox-chronology-cell">
                <div className="infobox-chronology">
                  <div className="infobox-chron-prev">
                    {chronology.prev ? (
                      <>
                        <span className="infobox-chron-label">Previous</span>
                        <Link to={`/season/${chronology.prev.sid}`} className="infobox-chron-link">
                          {chronology.prev.name}
                        </Link>
                      </>
                    ) : <span />}
                  </div>
                  <div className="infobox-chron-next">
                    {chronology.next ? (
                      <>
                        <span className="infobox-chron-label">Next</span>
                        <Link to={`/season/${chronology.next.sid}`} className="infobox-chron-link">
                          {chronology.next.name}
                        </Link>
                      </>
                    ) : <span />}
                  </div>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
