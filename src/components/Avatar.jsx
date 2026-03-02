// src/components/Avatar.jsx
import { usePhotoEditor } from '../context/PhotoEditorContext';

export default function Avatar({ name, color, size = 48, photoUrl, imgStyle, pid, noBorder = false }) {
  const ctx = usePhotoEditor();
  const editMode = ctx?.editMode ?? false;
  const setEditing = ctx?.setEditing;

  function handleEditClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setEditing({ pid, name, photoUrl, currentStyle: imgStyle ?? {} });
  }

  if (photoUrl) {
    return (
      <div
        className="avatar"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          border: noBorder ? 'none' : `2px solid ${color}`,
          position: 'relative',
        }}
      >
        <img
          src={photoUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center', ...imgStyle }}
        />
        {editMode && pid && (
          <button className="avatar-edit-btn" onClick={handleEditClick} title={`Edit ${name}'s photo`}>
            ✏️
          </button>
        )}
      </div>
    );
  }

  const initials = (name || '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
