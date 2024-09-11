"use client";
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import Bounded from "@/components/Bounded";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // OrbitControls eliminado ya que no es usado

/**
 * Props para `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Componente para "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);
  const threeContainerRef = useRef<HTMLDivElement>(null); // Ref para el contenedor 3D

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          },
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
        );
    }, component);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Almacenamos el valor de `threeContainerRef.current` en una variable local
    const containerRef = threeContainerRef.current;
    containerRef.appendChild(renderer.domElement);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let object: THREE.Object3D;
    const loader = new GLTFLoader();

    loader.load(
      `./scene.gltf`, // Cambia la ruta según tu modelo
      function (gltf) {
        object = gltf.scene;
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error(error);
      },
    );

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      if (object) {
        object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
        object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
      }
      renderer.render(scene, camera);
    };

    document.onmousemove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef) {
        containerRef.removeChild(renderer.domElement); // Usamos la variable local `containerRef`
      }
    };
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        
        <div className="col-start-1 md:row-start-1" data-speed=".2">
          <h1
            className="mb-8 text-[clamp(3rem,10vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300 ">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500  ">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>

      </div>
    </Bounded>
  );
};

export default Hero;
