// src/components/Breadcrumbs.jsx
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ crumbs }) {
  // crumbs: [{ label, to }, ..., { label }]  (last has no `to`)
  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="breadcrumb-item">
          {i > 0 && <span className="breadcrumb-sep"> &gt; </span>}
          {crumb.to ? (
            <Link to={crumb.to}>{crumb.label}</Link>
          ) : (
            <span className="breadcrumb-current">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
