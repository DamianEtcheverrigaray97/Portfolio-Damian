declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Group, Loader } from 'three';
  
    export class GLTFLoader extends Loader {
      load(
        url: string,
        onLoad: (gltf: { scene: Group }) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
    }
  }
  
  declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, MOUSE, Vector3 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
      object: Camera;
      target: Vector3;
      enableZoom: boolean;
      zoomSpeed: number;
      minDistance: number;
      maxDistance: number;
      enableRotate: boolean;
      rotateSpeed: number;
      enablePan: boolean;
      panSpeed: number;
      screenSpacePanning: boolean;
      enableDamping: boolean;
      dampingFactor: number;
      minPolarAngle: number;
      maxPolarAngle: number;
      minAzimuthAngle: number;
      maxAzimuthAngle: number;
      enableKeys: boolean;
      keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number };
      mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
      update(): void;
      saveState(): void;
      reset(): void;
      dispose(): void;
    }
  }
  