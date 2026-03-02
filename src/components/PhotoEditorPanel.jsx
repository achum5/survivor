// src/components/PhotoEditorPanel.jsx
import { useState, useRef, useCallback, useEffect } from 'react';

// X uses transformOrigin (controls zoom anchor = horizontal pan when scale > 1)
// Y uses objectPosition (controls vertical crop, works even at scale 1)
function parseTransformOriginX(to) {
  if (!to) return 50;
  const v = String(to).trim().split(/\s+/)[0];
  if (v === 'center') return 50;
  if (v === 'left') return 0;
  if (v === 'right') return 100;
  const n = parseFloat(v);
  return isNaN(n) ? 50 : n;
}

function parseObjPosY(pos) {
  if (!pos) return 50;
  const parts = String(pos).trim().split(/\s+/);
  const v = parts[1] ?? parts[0];
  if (!v || v === 'center') return 50;
  if (v === 'top') return 0;
  if (v === 'bottom') return 100;
  const n = parseFloat(v);
  return isNaN(n) ? 50 : n;
}

function parseScale(transform) {
  if (!transform) return 1;
  const m = String(transform).match(/scale\(([^)]+)\)/);
  return m ? (parseFloat(m[1]) || 1) : 1;
}

function parseHeight(style) {
  if (!style?.height) return 230;
  const n = parseFloat(style.height);
  return isNaN(n) ? 230 : n;
}

// Full image is displayed at this width in the portrait crop tool
const PREVIEW_W = 220;
// The actual infobox image width on the page: 260px infobox - 16px horizontal padding
const INFOBOX_W = 244;

export default function PhotoEditorPanel({ editing, onClose }) {
  const { name, photoUrl, currentStyle = {}, field = 'photoStyle' } = editing;

  const isPortrait = field === 'portraitStyle';

  // ── Face mode state ──────────────────────────────────────────────────
  const [posX, setPosX] = useState(() => parseTransformOriginX(currentStyle.transformOrigin));
  const [posY, setPosY] = useState(() => parseObjPosY(currentStyle.objectPosition));
  const [scale, setScale] = useState(() => parseScale(currentStyle.transform));

  // ── Portrait mode state ───────────────────────────────────────────────
  const [height, setHeight] = useState(() => parseHeight(currentStyle));
  const [pScale, setPScale] = useState(() => parseScale(currentStyle.transform));
  const [pPosX, setPPosX] = useState(() => parseTransformOriginX(currentStyle.transformOrigin));
  // imgDispH = natural height of preview image (at PREVIEW_W wide), set on load
  const [imgDispH, setImgDispH] = useState(0);
  // cropY = pixel offset of crop box top from image top (in preview coords)
  const [cropY, setCropY] = useState(0);

  const [copied, setCopied] = useState(false);

  // Crop box height in preview pixels, proportional to target height / infobox width
  const scaledCropH = Math.round(height * PREVIEW_W / INFOBOX_W);
  const maxCropY = Math.max(0, imgDispH - scaledCropH);
  // objectPosition Y: what % of the vertical overflow the crop box is at
  const objPosY = maxCropY > 0 ? Math.round((cropY / maxCropY) * 100) : 50;

  // When image loads: compute display height and initialize cropY from existing style
  const onImgLoad = useCallback((e) => {
    const { naturalWidth: nW, naturalHeight: nH } = e.target;
    const h = Math.round(PREVIEW_W * nH / nW);
    setImgDispH(h);
    const existingObjPosY = parseObjPosY(currentStyle.objectPosition);
    const initMax = Math.max(0, h - scaledCropH);
    // Clamp existing objPosY (which may be out of 0-100 range) to valid cropY
    const clamped = Math.max(0, Math.min(1, existingObjPosY / 100));
    setCropY(Math.round(clamped * initMax));
  }, [currentStyle.objectPosition, scaledCropH]);

  // When height changes, clamp cropY to the new maxCropY
  useEffect(() => {
    if (imgDispH > 0) {
      const newMax = Math.max(0, imgDispH - scaledCropH);
      setCropY((prev) => Math.max(0, Math.min(newMax, prev)));
    }
  }, [scaledCropH, imgDispH]);

  // Drag handler for portrait crop box
  const handleCropDrag = useCallback((e) => {
    e.preventDefault();
    const startMouseY = e.clientY;
    const startCropY = cropY;

    function onMove(ev) {
      const dy = ev.clientY - startMouseY;
      setCropY(Math.max(0, Math.min(maxCropY, startCropY + dy)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [cropY, maxCropY]);

  function buildStyleCode() {
    if (isPortrait) {
      const parts = [
        `objectFit: "cover"`, `width: "100%"`, `height: "${height}px"`,
        `objectPosition: "50% ${objPosY}%"`,
      ];
      if (pPosX !== 50) parts.push(`transformOrigin: "${pPosX}% 50%"`);
      if (pScale !== 1) parts.push(`transform: "scale(${pScale.toFixed(2)})"`);
      return `portraitStyle: { ${parts.join(', ')} }`;
    }
    const parts = [`objectPosition: "50% ${posY}%"`];
    if (posX !== 50) parts.push(`transformOrigin: "${posX}% 50%"`);
    if (scale !== 1) parts.push(`transform: "scale(${scale.toFixed(2)})"`);
    return `photoStyle: { ${parts.join(', ')} }`;
  }

  function copyCode() {
    const text = `${name}\n${buildStyleCode()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="photo-editor-panel">
      <div className="photo-editor-header">
        <span>✏️ {name} {isPortrait ? '(portrait)' : '(face)'}</span>
        <button className="photo-editor-close" onClick={onClose}>✕</button>
      </div>

      {isPortrait ? (
        // ── Portrait: full image + draggable crop box ──────────────────
        <div className="photo-editor-portrait-body">
          <div className="photo-editor-crop-wrap" style={{ width: PREVIEW_W }}>
            <img
              src={photoUrl}
              alt={name}
              onLoad={onImgLoad}
              style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
            />
            {imgDispH > 0 && (
              <>
                {/* Dark mask above crop box */}
                <div className="photo-editor-mask" style={{ top: 0, height: cropY }} />

                {/* Crop box */}
                <div
                  className="photo-editor-cropbox"
                  style={{
                    top: cropY,
                    height: scaledCropH,
                    cursor: maxCropY > 0 ? 'ns-resize' : 'default',
                  }}
                  onMouseDown={maxCropY > 0 ? handleCropDrag : undefined}
                >
                  {maxCropY > 0 && (
                    <div className="photo-editor-cropbox-handle">
                      <div className="photo-editor-cropbox-grip" />
                      <div className="photo-editor-cropbox-grip" />
                      <div className="photo-editor-cropbox-grip" />
                    </div>
                  )}
                </div>

                {/* Dark mask below crop box */}
                <div className="photo-editor-mask" style={{ top: cropY + scaledCropH, bottom: 0 }} />
              </>
            )}
          </div>

          <div className="photo-editor-portrait-controls">
            <label className="photo-editor-label">Height: <strong>{height}px</strong></label>
            <input
              type="range" min="150" max="500" value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="photo-editor-slider"
            />

            <label className="photo-editor-label">Zoom: <strong>{pScale.toFixed(2)}×</strong></label>
            <input
              type="range" min="1" max="3" step="0.05" value={pScale}
              onChange={(e) => setPScale(Number(e.target.value))}
              className="photo-editor-slider"
            />

            {pScale > 1 && (
              <>
                <label className="photo-editor-label">X: <strong>{pPosX}%</strong></label>
                <input
                  type="range" min="0" max="100" value={pPosX}
                  onChange={(e) => setPPosX(Number(e.target.value))}
                  className="photo-editor-slider"
                />
              </>
            )}

            <p className="photo-editor-hint">
              {maxCropY > 0 ? 'Drag the crop box to position' : 'Image fits within crop height'}
            </p>
          </div>
        </div>
      ) : (
        // ── Face mode: sliders ─────────────────────────────────────────
        <div className="photo-editor-body">
          <div className="photo-editor-preview-wrap">
            <img
              src={photoUrl}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `50% ${posY}%`,
                transformOrigin: `${posX}% 50%`,
                transform: scale !== 1 ? `scale(${scale.toFixed(2)})` : undefined,
                display: 'block',
              }}
            />
          </div>

          <div className="photo-editor-controls">
            <label className="photo-editor-label">X: <strong>{posX}%</strong></label>
            <input
              type="range" min="0" max="100" value={posX}
              onChange={(e) => setPosX(Number(e.target.value))}
              className="photo-editor-slider"
            />

            <label className="photo-editor-label">Y: <strong>{posY}%</strong></label>
            <input
              type="range" min="-200" max="300" value={posY}
              onChange={(e) => setPosY(Number(e.target.value))}
              className="photo-editor-slider"
            />

            <label className="photo-editor-label">Zoom: <strong>{scale.toFixed(2)}×</strong></label>
            <input
              type="range" min="1" max="3" step="0.05" value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="photo-editor-slider"
            />
          </div>
        </div>
      )}

      <div className="photo-editor-footer">
        <code className="photo-editor-code">{buildStyleCode()}</code>
        <button className="photo-editor-copy" onClick={copyCode}>
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
}
