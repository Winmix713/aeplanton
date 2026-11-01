import { useCallback, useRef, useState } from 'react';
import type { CameraMode, CameraState } from '../types/mission';
import type { MapPoint } from '../types/rover';

export function useCamera() {
  const cameraRef = useRef<CameraState>({ mode: 'site', zoom: 1, focus: null, frame: 'base' });
  const [mode, setModeState] = useState<CameraMode>('site');

  const setMode = useCallback((m: CameraMode) => {
    cameraRef.current.mode = m;
    cameraRef.current.focus = null;
    setModeState(m);
  }, []);

  const fly = useCallback((p: MapPoint) => {
    cameraRef.current.focus = p;
  }, []);

  const zoom = useCallback((dir: 1 | -1) => {
    const z = cameraRef.current.zoom * (dir > 0 ? 0.8 : 1.25);
    cameraRef.current.zoom = Math.min(2.2, Math.max(0.45, z));
  }, []);

  return { cameraRef, mode, setMode, fly, zoom };
}