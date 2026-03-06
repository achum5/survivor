// src/components/Infobox.jsx
import { Link } from 'react-router-dom';

export default function Infobox({ title, headerContent, headerColor = '#e74c3c', subtitle, subtitleColor, rows = [], logo, logoSubHeader, logoStyle, castPhoto, chronology, onLogoClick }) {
  const showHeader = title || headerContent;
  return (
    <table className="infobox">
      {showHeader && (
        <thead>
          <tr>
            <th colSpan={2} className="infobox-header" style={{ background: headerColor }}>
              {headerContent || title}
            </th>
          </tr>
          {subtitle && (
            <tr>
              <th colSpan={2} className={`infobox-subtitle${!subtitleColor ? ' winner-glow' : ''}`} style={subtitleColor ? { background: subtitleColor } : undefined}>
                {subtitle}
              </th>
            </tr>
          )}
        </thead>
      )}
      <tbody>
        {/* Logo */}
        {logo && (
          <tr>
            <td colSpan={2} className="infobox-logo-cell">
              {onLogoClick ? (
                <div className="infobox-logo-editable" onClick={onLogoClick}>
                  <img src={logo} alt={`${title} logo`} className="infobox-logo-img" style={logoStyle} />
                  <div className="infobox-logo-edit-overlay">✏️ Edit Photo</div>
                </div>
              ) : (
                <img src={logo} alt={`${title} logo`} className="infobox-logo-img" style={logoStyle} />
              )}
            </td>
          </tr>
        )}

        {/* Section sub-header below logo */}
        {logo && logoSubHeader && (
          <tr>
            <td colSpan={2} className="infobox-section-header">{logoSubHeader}</td>
          </tr>
        )}

        {/* Rows */}
        {rows.map((row, i) =>
          row.section ? (
            <tr key={row.section}>
              <td colSpan={2} className="infobox-section-header">{row.section}</td>
            </tr>
          ) : (
            <tr key={row.label} className={i % 2 === 0 ? 'infobox-row even' : 'infobox-row odd'}>
              <td className="infobox-label">{row.label}</td>
              <td className="infobox-value">{row.value}</td>
            </tr>
          )
        )}

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
