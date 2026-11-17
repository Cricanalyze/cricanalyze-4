import { useEffect, useRef } from "react";
import * as THREE from "three";

// Spinning 3D cricket bat (willow blade, splice, rubber grip); spins faster while scrolling.
export default function Bat3D({ className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, el.clientWidth / el.clientHeight, 0.1, 30);
    camera.position.set(0, 0.1, 9);
    scene.add(new THREE.HemisphereLight(0xfff3dc, 0x0b132b, 1.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(2, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x10b981, 16, 12);
    rim.position.set(-3, 1, -1);
    scene.add(rim);
    const bat = new THREE.Group();
    const willow = new THREE.MeshStandardMaterial({ color: 0xe8cf9c, roughness: 0.55 });
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.62, 2.6, 0.2, 4, 12, 2), willow);
    const pos = blade.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i), z = pos.getZ(i);
      if (z < 0) pos.setZ(i, z * (1.4 + 0.9 * Math.sin(((y + 1.3) / 2.6) * Math.PI * 0.8)));
      if (y < -1.25) pos.setX(i, pos.getX(i) * 0.94);
    }
    blade.geometry.computeVertexNormals();
    blade.position.y = -0.6;
    bat.add(blade);
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 }));
    sticker.position.set(0, 0.2, 0.101);
    bat.add(sticker);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 1.3, 24), new THREE.MeshStandardMaterial({ color: 0x0b132b, roughness: 0.85 }));
    handle.position.y = 1.35;
    bat.add(handle);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), handle.material);
    cap.position.y = 2;
    bat.add(cap);
    for (let i = 0; i < 9; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.108, 0.012, 6, 24), new THREE.MeshStandardMaterial({ color: 0x00b4d8 })); r.rotation.x = Math.PI / 2; r.position.y = 0.8 + i * 0.13; bat.add(r); }
    bat.rotation.set(0.2, 0, -0.5);
    scene.add(bat);
    let raf = 0, boost = 0, lastY = window.scrollY, visible = true;
    const onScroll = () => { boost = Math.min(0.3, boost + Math.abs(window.scrollY - lastY) * 0.002); lastY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
    io.observe(el);
    const t0 = performance.now();
    const loop = () => {
      if (!visible) return;
      bat.rotation.y += 0.014 + boost;
      bat.rotation.z = -0.5 + Math.sin((performance.now() - t0) / 900) * 0.15;
      boost *= 0.94;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("scroll", onScroll); scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); }); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} className={className} aria-hidden="true" data-testid="bat-3d" />;
}
