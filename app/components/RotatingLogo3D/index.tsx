"use client";

import { useEffect, useRef } from "react";
import styles from "./index.module.css";
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

export default function RotatingLogo3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const logoRoot = new Group();
    scene.add(logoRoot);

    const ambientLight = new AmbientLight(0xffffff, 2.4);
    const keyLight = new DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(2, 3, 5);
    scene.add(ambientLight, keyLight);

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
    loader.load("/models/logo.glb", (gltf) => {
      if (disposed) {
        return;
      }

      const model = gltf.scene;
      const bounds = new Box3().setFromObject(model);
      const center = bounds.getCenter(new Vector3());
      const size = bounds.getSize(new Vector3());
      const largestSide = Math.max(size.x, size.y, size.z) || 1;

      model.position.sub(center);
      model.scale.setScalar(3.7 / largestSide);
      logoRoot.add(model);
    });

    const animate = (time: number) => {
      logoRoot.rotation.y = time * 0.0032;
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
  }, []);

  return <div ref={mountRef} className={styles.root} aria-hidden="true" />;
}
