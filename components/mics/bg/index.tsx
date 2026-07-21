"use client";

import { useEffect, useRef, useState } from "react";

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Keep track of mouse positions for smooth interpolation (inertia)
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const currentMouseRef = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_uv;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 2D Value Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // Fractal Brownian Motion (4 octaves)
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotation matrix to reduce axial bias in FBM
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Normalized screen coords (0.0 to 1.0)
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;

        // Aspect ratio corrected coordinates for spatial calculations
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Mouse coordinates mapping matching the p-space
        vec2 mouse_p = (u_mouse * 2.0 - 1.0) * (u_resolution.xy / min(u_resolution.x, u_resolution.y));

        // Interactive Mouse Gravitational Warp
        vec2 mouse_dir = p - mouse_p;
        float mouse_dist = length(mouse_dir);
        // Warp coordinates near the cursor
        float warp_strength = smoothstep(0.9, 0.0, mouse_dist) * 0.25;
        p += normalize(mouse_dir) * warp_strength;

        // Fluid noise domain warping
        // q creates initial flowing wave coordinates
        vec2 q = vec2(0.0);
        q.x = fbm(p + vec2(0.0, 0.0) + vec2(0.03, 0.015) * u_time);
        q.y = fbm(p + vec2(5.2, 1.3) + vec2(-0.015, 0.02) * u_time);

        // r uses q to warp coordinates a second time (deep turbulent look)
        vec2 r = vec2(0.0);
        r.x = fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.012 * u_time);
        r.y = fbm(p + 3.0 * q + vec2(8.3, 2.8) + 0.009 * u_time);

        // Final noise function
        float f = fbm(p + 3.0 * r);

        // Color definitions aligned with the site's dark luxury / amethyst theme
        vec3 col_bg = vec3(0.015, 0.01, 0.035);          // Deepest Indigo/Black (HSL 240 15% 2%)
        vec3 col_amethyst = vec3(0.18, 0.06, 0.38);      // Royal Amethyst (HSL 275 60% 45%)
        vec3 col_indigo = vec3(0.05, 0.03, 0.18);        // Muted Indigo (HSL 240 18% 6%)
        vec3 col_platinum = vec3(0.88, 0.88, 0.94);      // Platinum highlight (HSL 220 15% 88%)

        // Composition of colors
        vec3 color = col_bg;
        // Blend in deep indigo based on q noise density
        color = mix(color, col_indigo, clamp(length(q), 0.0, 1.0) * 0.85);
        // Blend in amethyst purple currents based on r.x density
        color = mix(color, col_amethyst, clamp(r.x * 1.6, 0.0, 1.0) * 0.75);
        // Add glowing platinum highlight paths
        color = mix(color, col_platinum, clamp(f * f * 2.0, 0.0, 1.0) * 0.16);

        // Vignette to keep content readable and focus in the center
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        color *= mix(0.4, 1.0, vignette);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (
      source: string,
      type: number,
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = [
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight,
      ];
    };
    window.addEventListener("mousemove", handleMouseMove);

    const resizeCanvas = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let animationFrameId: number;
    let isPaused = false;
    const startTime = performance.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (isPaused) {
          isPaused = false;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (document.hidden) return;
      const elapsed = (performance.now() - startTime) * 0.001; // seconds

      const targetMouse = mouseRef.current;
      const currentMouse = currentMouseRef.current;
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05;

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, currentMouse[0], currentMouse[1]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="top-0 fixed -z-10 h-full w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #0d0526 0%, #05030a 100%)",
        }}
      />
    );
  }

  return (
    <div className="top-0 fixed -z-10 h-full w-full overflow-hidden bg-[#05030a]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-75 mix-blend-screen"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(5, 3, 10, 0.45) 100%)",
        }}
      />
    </div>
  );
};
