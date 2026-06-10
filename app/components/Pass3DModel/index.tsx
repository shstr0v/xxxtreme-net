"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  Material,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./index.module.css";

type Pass3DModelProps = {
  accent: string;
  code: string;
  model: string;
  title: string;
};

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    if (!(child instanceof Mesh)) {
      return;
    }

    child.geometry.dispose();

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material: Material) => {
      material.dispose();
    });
  });
}

export default function Pass3DModel({
  accent,
  code,
  model,
  title,
}: Pass3DModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    mount.dataset.fallback = "false";

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.55, 5.9);
    camera.lookAt(0, 0, 0);

    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      mount.dataset.fallback = "true";
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    const passRoot = new Group();
    scene.add(passRoot);

    const ambientLight = new AmbientLight(0xffffff, 2.4);
    const keyLight = new DirectionalLight(0xffffff, 5.2);
    const fillLight = new DirectionalLight(0xffffff, 1.2);
    const rimLight = new DirectionalLight(accent, 3);
    keyLight.position.set(2.5, 3.4, 5);
    fillLight.position.set(-2, -1, 2.5);
    rimLight.position.set(-3.5, 1.4, 2.4);
    scene.add(ambientLight, keyLight, fillLight, rimLight);

    let frameId = 0;
    let disposed = false;
    let loadedModel: Object3D | null = null;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const nextWidth = Math.max(width, 1);
      const nextHeight = Math.max(height, 1);

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    };

    const loader = new GLTFLoader();
    loader.load(
      model,
      (gltf) => {
        const nextModel = gltf.scene;

        if (disposed) {
          disposeObject(nextModel);
          return;
        }

        const bounds = new Box3().setFromObject(nextModel);
        const center = bounds.getCenter(new Vector3());
        const size = bounds.getSize(new Vector3());
        const largestSide = Math.max(size.x, size.y, size.z) || 1;

        nextModel.position.sub(center);
        nextModel.scale.setScalar(3.35 / largestSide);
        passRoot.add(nextModel);
        loadedModel = nextModel;
      },
      undefined,
      () => {
        if (!disposed) {
          mount.dataset.fallback = "true";
        }
      },
    );

    const animate = (time: number) => {
      passRoot.rotation.y = time * 0.00085;
      passRoot.rotation.x = 0.28 + Math.sin(time * 0.0007) * 0.025;
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

      if (loadedModel) {
        disposeObject(loadedModel);
        passRoot.remove(loadedModel);
      }

      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [accent, model]);

  return (
    <div
      ref={mountRef}
      className={styles.root}
      data-pass-code={code}
      data-pass-title={title}
      aria-hidden="true"
    />
  );
}
