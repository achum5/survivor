// src/context/PhotoEditorContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const PhotoEditorContext = createContext(null);

export function PhotoEditorProvider({ children }) {
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(null); // { pid, name, photoUrl, currentStyle }

  useEffect(() => {
    function onKey(e) {
      const tag = e.target?.tagName;
      if (
        e.key === 'e' &&
        !e.ctrlKey && !e.metaKey && !e.altKey &&
        tag !== 'INPUT' && tag !== 'TEXTAREA'
      ) {
        setEditMode((v) => !v);
        setEditing(null);
      }
      if (e.key === 'Escape') setEditing(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <PhotoEditorContext.Provider value={{ editMode, setEditMode, editing, setEditing }}>
      {children}
    </PhotoEditorContext.Provider>
  );
}

export function usePhotoEditor() {
  return useContext(PhotoEditorContext);
}
