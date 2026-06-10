"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./index.module.css";

type ArtistObject3DProps = {
  model: string;
  speed?: number;
};

export default function ArtistObject3D({
  model,
  speed = 0.0017,
}: ArtistObject3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.12, 5.4);

    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      mount.dataset.fallback = "true";
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const objectRoot = new Group();
    scene.add(objectRoot);

    const ambientLight = new AmbientLight(0xffffff, 2.6);
    const keyLight = new DirectionalLight(0xffffff, 4.8);
    const rimLight = new DirectionalLight(0x56ff02, 2.2);
    keyLight.position.set(2.4, 3.2, 5);
    rimLight.position.set(-3, 1.5, 2);
    scene.add(ambientLight, keyLight, rimLight);

    let frameId = 0;
    let disposed = false;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const nextWidth = Math.max(width, 1);
      const nextHeight = Math.max(height, 1);

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    };

    const loader = new GLTFLoader();
    loader.load(model, (gltf) => {
      if (disposed) {
        return;
      }

      const loadedModel = gltf.scene;
      const bounds = new Box3().setFromObject(loadedModel);
      const center = bounds.getCenter(new Vector3());
      const size = bounds.getSize(new Vector3());
      const largestSide = Math.max(size.x, size.y, size.z) || 1;

      loadedModel.position.sub(center);
      loadedModel.scale.setScalar(3.1 / largestSide);
      objectRoot.add(loadedModel);
    });

    const animate = (time: number) => {
      objectRoot.rotation.y = time * speed;
      objectRoot.rotation.x = Math.sin(time * 0.0008) * 0.08;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [model, speed]);

  return <div ref={mountRef} className={styles.root} aria-hidden="true" />;
}
