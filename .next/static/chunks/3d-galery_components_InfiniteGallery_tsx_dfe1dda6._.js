(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/3d-galery/components/InfiniteGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InfiniteGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/@react-three/drei/core/Texture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/3d-galery/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = ()=>{
    return new __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        transparent: true,
        uniforms: {
            map: {
                value: null
            },
            opacity: {
                value: 1.0
            },
            blurAmount: {
                value: 0.0
            },
            scrollForce: {
                value: 0.0
            },
            time: {
                value: 0.0
            },
            isHovered: {
                value: 0.0
            }
        },
        vertexShader: "\n      uniform float scrollForce;\n      uniform float time;\n      uniform float isHovered;\n      varying vec2 vUv;\n      varying vec3 vNormal;\n      \n      void main() {\n        vUv = uv;\n        vNormal = normal;\n        \n        vec3 pos = position;\n        \n        // Create smooth curving based on scroll force\n        float curveIntensity = scrollForce * 0.3;\n        \n        // Base curve across the plane based on distance from center\n        float distanceFromCenter = length(pos.xy);\n        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;\n        \n        // Add gentle cloth-like ripples\n        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;\n        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;\n        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;\n        \n        // Flag waving effect when hovered\n        float flagWave = 0.0;\n        if (isHovered > 0.5) {\n          // Create flag-like wave from left to right\n          float wavePhase = pos.x * 3.0 + time * 8.0;\n          float waveAmplitude = sin(wavePhase) * 0.1;\n          // Damping effect - stronger wave on the right side (free edge)\n          float dampening = smoothstep(-0.5, 0.5, pos.x);\n          flagWave = waveAmplitude * dampening;\n          \n          // Add secondary smaller waves for more realistic flag motion\n          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;\n          flagWave += secondaryWave;\n        }\n        \n        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave\n        pos.z -= (curve + clothEffect + flagWave);\n        \n        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n      }\n    ",
        fragmentShader: "\n      uniform sampler2D map;\n      uniform float opacity;\n      uniform float blurAmount;\n      uniform float scrollForce;\n      varying vec2 vUv;\n      varying vec3 vNormal;\n      \n      void main() {\n        vec4 color = texture2D(map, vUv);\n        \n        // Simple blur approximation\n        if (blurAmount > 0.0) {\n          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));\n          vec4 blurred = vec4(0.0);\n          float total = 0.0;\n          \n          for (float x = -2.0; x <= 2.0; x += 1.0) {\n            for (float y = -2.0; y <= 2.0; y += 1.0) {\n              vec2 offset = vec2(x, y) * texelSize * blurAmount;\n              float weight = 1.0 / (1.0 + length(vec2(x, y)));\n              blurred += texture2D(map, vUv + offset) * weight;\n              total += weight;\n            }\n          }\n          color = blurred / total;\n        }\n        \n        // Add subtle lighting effect based on curving\n        float curveHighlight = abs(scrollForce) * 0.05;\n        color.rgb += vec3(curveHighlight * 0.1);\n        \n        gl_FragColor = vec4(color.rgb, color.a * opacity);\n      }\n    "
    });
};
function ImagePlane(param) {
    let { texture, position, scale, material } = param;
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImagePlane.useEffect": ()=>{
            if (material && texture) {
                material.uniforms.map.value = texture;
            }
        }
    }["ImagePlane.useEffect"], [
        material,
        texture
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImagePlane.useEffect": ()=>{
            if (material && material.uniforms) {
                material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
            }
        }
    }["ImagePlane.useEffect"], [
        material,
        isHovered
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        position: position,
        scale: scale,
        material: material,
        onPointerEnter: ()=>setIsHovered(true),
        onPointerLeave: ()=>setIsHovered(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
            args: [
                1,
                1,
                32,
                32
            ]
        }, void 0, false, {
            fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
            lineNumber: 202,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
        lineNumber: 194,
        columnNumber: 3
    }, this);
}
_s(ImagePlane, "elfU4Jte2AvwIzWAQYO3htg6wHU=");
_c = ImagePlane;
function GalleryScene(param) {
    let { images, speed = 1, visibleCount = 8, fadeSettings = {
        fadeIn: {
            start: 0.05,
            end: 0.15
        },
        fadeOut: {
            start: 0.85,
            end: 0.95
        }
    }, blurSettings = {
        blurIn: {
            start: 0.0,
            end: 0.1
        },
        blurOut: {
            start: 0.9,
            end: 1.0
        },
        maxBlur: 3.0
    } } = param;
    _s1();
    const [scrollVelocity, setScrollVelocity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [autoPlay, setAutoPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const lastInteraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    // Normalize images to objects
    const normalizedImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GalleryScene.useMemo[normalizedImages]": ()=>images.map({
                "GalleryScene.useMemo[normalizedImages]": (img)=>typeof img === 'string' ? {
                        src: img,
                        alt: ''
                    } : img
            }["GalleryScene.useMemo[normalizedImages]"])
    }["GalleryScene.useMemo[normalizedImages]"], [
        images
    ]);
    // Load textures
    const textures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"])(normalizedImages.map({
        "GalleryScene.useTexture[textures]": (img)=>img.src
    }["GalleryScene.useTexture[textures]"]));
    // Create materials pool
    const materials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GalleryScene.useMemo[materials]": ()=>Array.from({
                length: visibleCount
            }, {
                "GalleryScene.useMemo[materials]": ()=>createClothMaterial()
            }["GalleryScene.useMemo[materials]"])
    }["GalleryScene.useMemo[materials]"], [
        visibleCount
    ]);
    const spatialPositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GalleryScene.useMemo[spatialPositions]": ()=>{
            const positions = [];
            const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
            const maxVerticalOffset = MAX_VERTICAL_OFFSET;
            for(let i = 0; i < visibleCount; i++){
                // Create varied distribution patterns for both axes
                const horizontalAngle = i * 2.618 % (Math.PI * 2); // Golden angle for natural distribution
                const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2); // Offset angle for vertical
                const horizontalRadius = i % 3 * 1.2; // Vary the distance from center
                const verticalRadius = (i + 1) % 4 * 0.8; // Different pattern for vertical
                const x = Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset / 3;
                const y = Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset / 4;
                positions.push({
                    x,
                    y
                });
            }
            return positions;
        }
    }["GalleryScene.useMemo[spatialPositions]"], [
        visibleCount
    ]);
    const totalImages = normalizedImages.length;
    const depthRange = DEFAULT_DEPTH_RANGE;
    // Initialize plane data
    const planesData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Array.from({
        length: visibleCount
    }, {
        "GalleryScene.useRef[planesData]": (_, i)=>{
            var _spatialPositions_i, _spatialPositions_i1;
            var _spatialPositions_i_x, _spatialPositions_i_y;
            return {
                index: i,
                z: visibleCount > 0 ? depthRange / visibleCount * i % depthRange : 0,
                imageIndex: totalImages > 0 ? i % totalImages : 0,
                x: (_spatialPositions_i_x = (_spatialPositions_i = spatialPositions[i]) === null || _spatialPositions_i === void 0 ? void 0 : _spatialPositions_i.x) !== null && _spatialPositions_i_x !== void 0 ? _spatialPositions_i_x : 0,
                y: (_spatialPositions_i_y = (_spatialPositions_i1 = spatialPositions[i]) === null || _spatialPositions_i1 === void 0 ? void 0 : _spatialPositions_i1.y) !== null && _spatialPositions_i_y !== void 0 ? _spatialPositions_i_y : 0
            };
        }
    }["GalleryScene.useRef[planesData]"]));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryScene.useEffect": ()=>{
            planesData.current = Array.from({
                length: visibleCount
            }, {
                "GalleryScene.useEffect": (_, i)=>{
                    var _spatialPositions_i, _spatialPositions_i1;
                    var _spatialPositions_i_x, _spatialPositions_i_y;
                    return {
                        index: i,
                        z: visibleCount > 0 ? depthRange / Math.max(visibleCount, 1) * i % depthRange : 0,
                        imageIndex: totalImages > 0 ? i % totalImages : 0,
                        x: (_spatialPositions_i_x = (_spatialPositions_i = spatialPositions[i]) === null || _spatialPositions_i === void 0 ? void 0 : _spatialPositions_i.x) !== null && _spatialPositions_i_x !== void 0 ? _spatialPositions_i_x : 0,
                        y: (_spatialPositions_i_y = (_spatialPositions_i1 = spatialPositions[i]) === null || _spatialPositions_i1 === void 0 ? void 0 : _spatialPositions_i1.y) !== null && _spatialPositions_i_y !== void 0 ? _spatialPositions_i_y : 0
                    };
                }
            }["GalleryScene.useEffect"]);
        }
    }["GalleryScene.useEffect"], [
        depthRange,
        spatialPositions,
        totalImages,
        visibleCount
    ]);
    // Handle scroll input
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GalleryScene.useCallback[handleWheel]": (event)=>{
            event.preventDefault();
            setScrollVelocity({
                "GalleryScene.useCallback[handleWheel]": (prev)=>prev + event.deltaY * 0.01 * speed
            }["GalleryScene.useCallback[handleWheel]"]);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        }
    }["GalleryScene.useCallback[handleWheel]"], [
        speed
    ]);
    // Handle keyboard input
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GalleryScene.useCallback[handleKeyDown]": (event)=>{
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                setScrollVelocity({
                    "GalleryScene.useCallback[handleKeyDown]": (prev)=>prev - 2 * speed
                }["GalleryScene.useCallback[handleKeyDown]"]);
                setAutoPlay(false);
                lastInteraction.current = Date.now();
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                setScrollVelocity({
                    "GalleryScene.useCallback[handleKeyDown]": (prev)=>prev + 2 * speed
                }["GalleryScene.useCallback[handleKeyDown]"]);
                setAutoPlay(false);
                lastInteraction.current = Date.now();
            }
        }
    }["GalleryScene.useCallback[handleKeyDown]"], [
        speed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryScene.useEffect": ()=>{
            const canvas = document.querySelector('canvas');
            if (canvas) {
                canvas.addEventListener('wheel', handleWheel, {
                    passive: false
                });
                document.addEventListener('keydown', handleKeyDown);
                return ({
                    "GalleryScene.useEffect": ()=>{
                        canvas.removeEventListener('wheel', handleWheel);
                        document.removeEventListener('keydown', handleKeyDown);
                    }
                })["GalleryScene.useEffect"];
            }
        }
    }["GalleryScene.useEffect"], [
        handleWheel,
        handleKeyDown
    ]);
    // Auto-play logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryScene.useEffect": ()=>{
            const interval = setInterval({
                "GalleryScene.useEffect.interval": ()=>{
                    if (Date.now() - lastInteraction.current > 3000) {
                        setAutoPlay(true);
                    }
                }
            }["GalleryScene.useEffect.interval"], 1000);
            return ({
                "GalleryScene.useEffect": ()=>clearInterval(interval)
            })["GalleryScene.useEffect"];
        }
    }["GalleryScene.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GalleryScene.useFrame": (state, delta)=>{
            // Apply auto-play
            if (autoPlay) {
                setScrollVelocity({
                    "GalleryScene.useFrame": (prev)=>prev + 0.3 * delta
                }["GalleryScene.useFrame"]);
            }
            // Damping
            setScrollVelocity({
                "GalleryScene.useFrame": (prev)=>prev * 0.95
            }["GalleryScene.useFrame"]);
            // Update time uniform for all materials
            const time = state.clock.getElapsedTime();
            materials.forEach({
                "GalleryScene.useFrame": (material)=>{
                    if (material && material.uniforms) {
                        material.uniforms.time.value = time;
                        material.uniforms.scrollForce.value = scrollVelocity;
                    }
                }
            }["GalleryScene.useFrame"]);
            // Update plane positions
            const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
            const totalRange = depthRange;
            const halfRange = totalRange / 2;
            planesData.current.forEach({
                "GalleryScene.useFrame": (plane, i)=>{
                    var _spatialPositions_i, _spatialPositions_i1;
                    let newZ = plane.z + scrollVelocity * delta * 10;
                    let wrapsForward = 0;
                    let wrapsBackward = 0;
                    if (newZ >= totalRange) {
                        wrapsForward = Math.floor(newZ / totalRange);
                        newZ -= totalRange * wrapsForward;
                    } else if (newZ < 0) {
                        wrapsBackward = Math.ceil(-newZ / totalRange);
                        newZ += totalRange * wrapsBackward;
                    }
                    if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
                        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
                    }
                    if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
                        const step = plane.imageIndex - wrapsBackward * imageAdvance;
                        plane.imageIndex = (step % totalImages + totalImages) % totalImages;
                    }
                    plane.z = (newZ % totalRange + totalRange) % totalRange;
                    var _spatialPositions_i_x;
                    plane.x = (_spatialPositions_i_x = (_spatialPositions_i = spatialPositions[i]) === null || _spatialPositions_i === void 0 ? void 0 : _spatialPositions_i.x) !== null && _spatialPositions_i_x !== void 0 ? _spatialPositions_i_x : 0;
                    var _spatialPositions_i_y;
                    plane.y = (_spatialPositions_i_y = (_spatialPositions_i1 = spatialPositions[i]) === null || _spatialPositions_i1 === void 0 ? void 0 : _spatialPositions_i1.y) !== null && _spatialPositions_i_y !== void 0 ? _spatialPositions_i_y : 0;
                    const worldZ = plane.z - halfRange;
                    // Calculate opacity based on fade settings
                    const normalizedPosition = plane.z / totalRange; // 0 to 1
                    let opacity = 1;
                    if (normalizedPosition >= fadeSettings.fadeIn.start && normalizedPosition <= fadeSettings.fadeIn.end) {
                        // Fade in: opacity goes from 0 to 1 within the fade in range
                        const fadeInProgress = (normalizedPosition - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
                        opacity = fadeInProgress;
                    } else if (normalizedPosition < fadeSettings.fadeIn.start) {
                        // Before fade in starts: fully transparent
                        opacity = 0;
                    } else if (normalizedPosition >= fadeSettings.fadeOut.start && normalizedPosition <= fadeSettings.fadeOut.end) {
                        // Fade out: opacity goes from 1 to 0 within the fade out range
                        const fadeOutProgress = (normalizedPosition - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
                        opacity = 1 - fadeOutProgress;
                    } else if (normalizedPosition > fadeSettings.fadeOut.end) {
                        // After fade out ends: fully transparent
                        opacity = 0;
                    }
                    // Clamp opacity between 0 and 1
                    opacity = Math.max(0, Math.min(1, opacity));
                    // Calculate blur based on blur settings
                    let blur = 0;
                    if (normalizedPosition >= blurSettings.blurIn.start && normalizedPosition <= blurSettings.blurIn.end) {
                        // Blur in: blur goes from maxBlur to 0 within the blur in range
                        const blurInProgress = (normalizedPosition - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start);
                        blur = blurSettings.maxBlur * (1 - blurInProgress);
                    } else if (normalizedPosition < blurSettings.blurIn.start) {
                        // Before blur in starts: full blur
                        blur = blurSettings.maxBlur;
                    } else if (normalizedPosition >= blurSettings.blurOut.start && normalizedPosition <= blurSettings.blurOut.end) {
                        // Blur out: blur goes from 0 to maxBlur within the blur out range
                        const blurOutProgress = (normalizedPosition - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start);
                        blur = blurSettings.maxBlur * blurOutProgress;
                    } else if (normalizedPosition > blurSettings.blurOut.end) {
                        // After blur out ends: full blur
                        blur = blurSettings.maxBlur;
                    }
                    // Clamp blur to reasonable values
                    blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));
                    // Update material uniforms
                    const material = materials[i];
                    if (material && material.uniforms) {
                        material.uniforms.opacity.value = opacity;
                        material.uniforms.blurAmount.value = blur;
                    }
                }
            }["GalleryScene.useFrame"]);
        }
    }["GalleryScene.useFrame"]);
    if (normalizedImages.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: planesData.current.map((plane, i)=>{
            const texture = textures[plane.imageIndex];
            const material = materials[i];
            if (!texture || !material) return null;
            const worldZ = plane.z - depthRange / 2;
            // Calculate scale to maintain aspect ratio
            const aspect = texture.image ? texture.image.width / texture.image.height : 1;
            const scale = aspect > 1 ? [
                2 * aspect,
                2,
                1
            ] : [
                2,
                2 / aspect,
                1
            ];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImagePlane, {
                texture: texture,
                position: [
                    plane.x,
                    plane.y,
                    worldZ
                ],
                scale: scale,
                material: material
            }, plane.index, false, {
                fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                lineNumber: 492,
                columnNumber: 6
            }, this);
        })
    }, void 0, false);
}
_s1(GalleryScene, "VdEFnWt2gqwU99j+mr0MYSs1jZA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = GalleryScene;
// Fallback component for when WebGL is not available
function FallbackGallery(param) {
    let { images } = param;
    _s2();
    const normalizedImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FallbackGallery.useMemo[normalizedImages]": ()=>images.map({
                "FallbackGallery.useMemo[normalizedImages]": (img)=>typeof img === 'string' ? {
                        src: img,
                        alt: ''
                    } : img
            }["FallbackGallery.useMemo[normalizedImages]"])
    }["FallbackGallery.useMemo[normalizedImages]"], [
        images
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full bg-gray-100 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 mb-4",
                children: "WebGL not supported. Showing image list:"
            }, void 0, false, {
                fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                lineNumber: 517,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto",
                children: normalizedImages.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: img.src || '/placeholder.svg',
                        alt: img.alt,
                        className: "w-full h-32 object-cover rounded"
                    }, i, false, {
                        fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                        lineNumber: 522,
                        columnNumber: 6
                    }, this))
            }, void 0, false, {
                fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                lineNumber: 520,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
        lineNumber: 516,
        columnNumber: 3
    }, this);
}
_s2(FallbackGallery, "bUjdlshIYtxQPVxbi+H9AdMjSmg=");
_c2 = FallbackGallery;
function InfiniteGallery(param) {
    let { images, className = 'h-96 w-full', style, fadeSettings = {
        fadeIn: {
            start: 0.05,
            end: 0.25
        },
        fadeOut: {
            start: 0.4,
            end: 0.43
        }
    }, blurSettings = {
        blurIn: {
            start: 0.0,
            end: 0.1
        },
        blurOut: {
            start: 0.4,
            end: 0.43
        },
        maxBlur: 8.0
    } } = param;
    _s3();
    const [webglSupported, setWebglSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InfiniteGallery.useEffect": ()=>{
            // Check WebGL support
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) {
                    setWebglSupported(false);
                }
            } catch (e) {
                setWebglSupported(false);
            }
        }
    }["InfiniteGallery.useEffect"], []);
    if (!webglSupported) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            style: style,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FallbackGallery, {
                images: images
            }, void 0, false, {
                fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                lineNumber: 567,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
            lineNumber: 566,
            columnNumber: 4
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: style,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0,
                    0
                ],
                fov: 55
            },
            gl: {
                antialias: true,
                alpha: true
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$3d$2d$galery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GalleryScene, {
                images: images,
                fadeSettings: fadeSettings,
                blurSettings: blurSettings
            }, void 0, false, {
                fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
                lineNumber: 578,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
            lineNumber: 574,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/3d-galery/components/InfiniteGallery.tsx",
        lineNumber: 573,
        columnNumber: 3
    }, this);
}
_s3(InfiniteGallery, "bvFIasIqZOO0d6r6FtPFbsAGK2Q=");
_c3 = InfiniteGallery;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ImagePlane");
__turbopack_context__.k.register(_c1, "GalleryScene");
__turbopack_context__.k.register(_c2, "FallbackGallery");
__turbopack_context__.k.register(_c3, "InfiniteGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=3d-galery_components_InfiniteGallery_tsx_dfe1dda6._.js.map