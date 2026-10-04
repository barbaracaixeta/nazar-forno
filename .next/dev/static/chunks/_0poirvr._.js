(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/three/ModelViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModelViewer",
    ()=>ModelViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$NazarHeroScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/NazarHeroScene.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$three$2f$WebGLFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/three/WebGLFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ModelViewer({ enabled, quality = "high", interactive = true, intensity = 0.85, model = null, description, className }) {
    _s();
    const [degraded, setDegraded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contextLost, setContextLost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reset ao mudar `enabled`: ajustamos o estado durante o render, que é o
    // padrão do React para "derivar estado de prop", em vez de um efeito que
    // dispara um segundo render.
    const [lastEnabled, setLastEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(enabled);
    if (lastEnabled !== enabled) {
        setLastEnabled(enabled);
        if (degraded) setDegraded(false);
        if (contextLost) setContextLost(false);
    }
    const onDegrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModelViewer.useCallback[onDegrade]": ()=>{
            setDegraded(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])("webgl_fallback", {
                scope: "hero",
                cause: "low-fps"
            });
        }
    }["ModelViewer.useCallback[onDegrade]"], []);
    const onContextLost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModelViewer.useCallback[onContextLost]": ()=>{
            setContextLost(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])("webgl_fallback", {
                scope: "hero",
                cause: "context-lost"
            });
        }
    }["ModelViewer.useCallback[onContextLost]"], []);
    const showScene = enabled && !contextLost;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModelViewer.useEffect": ()=>{
            if (showScene) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])("view_3d_hero", {
                quality: degraded ? "low" : quality
            });
        }
    }["ModelViewer.useEffect"], [
        showScene,
        degraded,
        quality
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative isolate", className),
        "data-3d-enabled": enabled,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$three$2f$WebGLFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLFallback"], {
                className: "absolute inset-0",
                hidden: showScene
            }, void 0, false, {
                fileName: "[project]/components/three/ModelViewer.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            showScene ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 animate-fade",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$NazarHeroScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NazarHeroScene"], {
                    interactive: interactive,
                    intensity: intensity,
                    quality: degraded ? "low" : quality,
                    model: model,
                    onInteract: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])("interact_3d_hero"),
                    onDegrade: onDegrade,
                    onContextLost: onContextLost
                }, void 0, false, {
                    fileName: "[project]/components/three/ModelViewer.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/three/ModelViewer.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "sr-only",
                children: description
            }, void 0, false, {
                fileName: "[project]/components/three/ModelViewer.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/three/ModelViewer.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(ModelViewer, "FFM8CI5qLPQzzLC/HNm+EUGwxro=");
_c = ModelViewer;
var _c;
__turbopack_context__.k.register(_c, "ModelViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/three/ModelViewer.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/three/ModelViewer.tsx [app-client] (ecmascript)"));
}),
"[project]/three/NazarHeroScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NazarHeroScene",
    ()=>NazarHeroScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/materials.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/textures.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/palette.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const YAW_LIMIT = 0.2; // ~11°
const PITCH_LIMIT = 0.11; // ~6°
function NazarHeroScene({ interactive, intensity, quality, onInteract, onDegrade, onContextLost }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        dpr: quality === "high" ? [
            1,
            1.75
        ] : [
            1,
            1.25
        ],
        camera: {
            position: [
                0,
                0.62,
                4.6
            ],
            fov: 36,
            near: 0.1,
            far: 30
        },
        gl: {
            antialias: quality === "high",
            alpha: true,
            powerPreference: "high-performance"
        },
        style: {
            touchAction: "pan-y"
        },
        onCreated: ({ gl })=>gl.setClearColor(0x000000, 0),
        frameloop: "always",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneContents, {
            interactive: interactive,
            intensity: intensity,
            quality: quality,
            onInteract: onInteract,
            onDegrade: onDegrade,
            onContextLost: onContextLost
        }, void 0, false, {
            fileName: "[project]/three/NazarHeroScene.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/three/NazarHeroScene.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = NazarHeroScene;
function SceneContents({ interactive, intensity, quality, onInteract, onDegrade, onContextLost }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityGate, {}, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContextGuard, {
                onLost: onContextLost
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PerformanceGuard, {
                onDegrade: onDegrade
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.55,
                color: "#ffe7c4"
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -2.4,
                    3.2,
                    2.6
                ],
                intensity: 2.1,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].keyLight
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    2.8,
                    0.6,
                    1.4
                ],
                intensity: 0.55,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].rimLight
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0.4,
                    -1.6,
                    1.8
                ],
                intensity: 0.7,
                color: "#ff9a4d"
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stage, {
                interactive: interactive,
                intensity: intensity,
                quality: quality,
                onInteract: onInteract
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/three/NazarHeroScene.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c1 = SceneContents;
/* -------------------------------------------------------------------------- */ /* Objeto principal: massa, prato, sombra, vapor                               */ /* -------------------------------------------------------------------------- */ function Stage({ interactive, intensity, quality, onInteract }) {
    _s();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const heat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pulse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    });
    const scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const doughGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[doughGeometry]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSifihaGeometry"])(quality === "high" ? {
                widthSegments: 96,
                heightSegments: 64
            } : {
                widthSegments: 48,
                heightSegments: 32
            })
    }["Stage.useMemo[doughGeometry]"], [
        quality
    ]);
    const doughMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[doughMaterial]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDoughMaterial"])()
    }["Stage.useMemo[doughMaterial]"], []);
    /**
   * Espelho em ref do material. O `useFrame` muda `uHeat` a cada quadro: isso é
   * mutação de objeto de GPU, não estado de React. O Compiler do React
   * congelaria um valor devolvido por `useMemo`, então o loop escreve pelo ref
   * — o único container mutável por contrato.
   */ const doughMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(doughMaterial);
    const plateGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[plateGeometry]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPlateGeometry"])()
    }["Stage.useMemo[plateGeometry]"], []);
    const plateMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[plateMaterial]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPlateMaterial"])()
    }["Stage.useMemo[plateMaterial]"], []);
    const shadowTexture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[shadowTexture]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContactShadowTexture"])()
    }["Stage.useMemo[shadowTexture]"], []);
    const steamTexture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[steamTexture]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSteamTexture"])()
    }["Stage.useMemo[steamTexture]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stage.useEffect": ()=>{
            return ({
                "Stage.useEffect": ()=>{
                    doughGeometry.dispose();
                    doughMaterial.dispose();
                    plateGeometry.dispose();
                    plateMaterial.dispose();
                    shadowTexture.dispose();
                    steamTexture.dispose();
                }
            })["Stage.useEffect"];
        }
    }["Stage.useEffect"], [
        doughGeometry,
        doughMaterial,
        plateGeometry,
        plateMaterial,
        shadowTexture,
        steamTexture
    ]);
    /* --- ponteiro: janela inteira, para que o objeto responda mesmo quando o
         cursor está sobre o texto do hero ---------------------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stage.useEffect": ()=>{
            if (!interactive) return;
            const onMove = {
                "Stage.useEffect.onMove": (event)=>{
                    // No toque, só reage enquanto o dedo está arrastando sobre o objeto.
                    if (event.pointerType === "touch" && !dragging.current) return;
                    const target = pointer.current;
                    target.targetX = event.clientX / window.innerWidth * 2 - 1;
                    target.targetY = event.clientY / window.innerHeight * 2 - 1;
                }
            }["Stage.useEffect.onMove"];
            const onLeave = {
                "Stage.useEffect.onLeave": ()=>{
                    pointer.current.targetX = 0;
                    pointer.current.targetY = 0;
                }
            }["Stage.useEffect.onLeave"];
            const onDown = {
                "Stage.useEffect.onDown": (event)=>{
                    if (event.pointerType === "touch") dragging.current = true;
                }
            }["Stage.useEffect.onDown"];
            const onUp = {
                "Stage.useEffect.onUp": (event)=>{
                    if (event.pointerType === "touch") dragging.current = false;
                }
            }["Stage.useEffect.onUp"];
            window.addEventListener("pointermove", onMove, {
                passive: true
            });
            window.addEventListener("pointerdown", onDown, {
                passive: true
            });
            window.addEventListener("pointerup", onUp, {
                passive: true
            });
            window.addEventListener("pointerleave", onLeave, {
                passive: true
            });
            return ({
                "Stage.useEffect": ()=>{
                    window.removeEventListener("pointermove", onMove);
                    window.removeEventListener("pointerdown", onDown);
                    window.removeEventListener("pointerup", onUp);
                    window.removeEventListener("pointerleave", onLeave);
                }
            })["Stage.useEffect"];
        }
    }["Stage.useEffect"], [
        interactive
    ]);
    /* --- rolagem: aproximação e rotação mínimas ----------------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stage.useEffect": ()=>{
            const onScroll = {
                "Stage.useEffect.onScroll": ()=>{
                    const hero = document.getElementById("hero");
                    if (!hero) return;
                    const rect = hero.getBoundingClientRect();
                    const total = rect.height + window.innerHeight;
                    scroll.current = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
                }
            }["Stage.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            window.addEventListener("resize", onScroll, {
                passive: true
            });
            return ({
                "Stage.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onScroll);
                }
            })["Stage.useEffect"];
        }
    }["Stage.useEffect"], []);
    /* --- toque/clique: pulso de calor. É atmosfera, não informação: nada é
         revelado apenas por esta interação, então não exige equivalente por
         teclado (brief §24). */ const triggerHeat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[triggerHeat]": ()=>{
            heat.current = 1;
            pulse.current = 1;
            onInteract?.();
        }
    }["Stage.useCallback[triggerHeat]"], [
        onInteract
    ]);
    // Só conta como toque se o dedo/cursor não arrastou (evita disparo ao rolar).
    const handlePointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[handlePointerUp]": (event)=>{
            void event;
            triggerHeat();
        }
    }["Stage.useCallback[handlePointerUp]"], [
        triggerHeat
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Stage.useFrame": (state, delta)=>{
            const node = group.current;
            if (!node) return;
            const t = state.clock.elapsedTime;
            const damping = 1 - Math.pow(0.0016, delta); // ~0.12 por quadro a 60fps
            const p = pointer.current;
            p.x += (p.targetX - p.x) * damping;
            p.y += (p.targetY - p.y) * damping;
            const strength = interactive ? intensity : 0;
            const progress = scroll.current;
            // respiração muito lenta: o objeto parece vivo, não girando
            const breathe = Math.sin(t * 0.32) * 0.022;
            const idleYaw = Math.sin(t * 0.14) * 0.05;
            node.rotation.y = idleYaw + p.x * YAW_LIMIT * strength + progress * 0.2;
            node.rotation.x = breathe + p.y * PITCH_LIMIT * strength;
            const approach = 1 + progress * 0.06 * strength;
            const pulseScale = 1 + pulse.current * 0.028;
            node.scale.setScalar(approach * pulseScale);
            node.position.y = -progress * 0.05 * strength;
            // calor e pulso decaem
            heat.current = Math.max(0, heat.current - delta * 1.6);
            pulse.current = Math.max(0, pulse.current - delta * 2.4);
            doughMaterialRef.current.uniforms.uHeat.value = heat.current;
        }
    }["Stage.useFrame"]);
    const steamCount = quality === "high" ? 3 : 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: plateGeometry,
                material: plateMaterial,
                position: [
                    0,
                    -0.575,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.532,
                    0
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                scale: 2.1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            1,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/three/NazarHeroScene.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        map: shadowTexture,
                        transparent: true,
                        opacity: 0.62,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/three/NazarHeroScene.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: group,
                onPointerUp: handlePointerUp,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: doughGeometry,
                        material: doughMaterial,
                        position: [
                            0,
                            -0.05,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/three/NazarHeroScene.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    Array.from({
                        length: steamCount
                    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SteamSprite, {
                            texture: steamTexture,
                            index: index,
                            count: steamCount
                        }, index, false, {
                            fileName: "[project]/three/NazarHeroScene.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/three/NazarHeroScene.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/three/NazarHeroScene.tsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
_s(Stage, "XQFap6XA5AxhOngbliTgCOQnRS8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = Stage;
/* -------------------------------------------------------------------------- */ /* Vapor                                                                      */ /* -------------------------------------------------------------------------- */ function SteamSprite({ texture, index, count }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const offset = index / count;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "SteamSprite.useFrame": (state)=>{
            const sprite = ref.current;
            if (!sprite) return;
            const t = state.clock.elapsedTime * 0.32 + offset;
            const cycle = t % 1;
            sprite.position.set(Math.sin(t * 1.6 + index) * 0.3, 0.72 + cycle * 1.15, Math.cos(t * 1.1 + index) * 0.12);
            const scale = 0.42 + cycle * 0.85;
            sprite.scale.set(scale, scale * 1.25, 1);
            sprite.material.opacity = Math.sin(cycle * Math.PI) * 0.17;
        }
    }["SteamSprite.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sprite", {
        ref: ref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spriteMaterial", {
            map: texture,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].steam,
            transparent: true,
            opacity: 0,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/three/NazarHeroScene.tsx",
            lineNumber: 348,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/three/NazarHeroScene.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_s1(SteamSprite, "8QVLrcMdYxPUkj6ry5zpyt6J6X8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = SteamSprite;
/* -------------------------------------------------------------------------- */ /* Gestão de energia e qualidade                                              */ /* -------------------------------------------------------------------------- */ /** Pause a cena fora da viewport ou com aba em segundo plano. */ function ActivityGate() {
    _s2();
    const setFrameloop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "ActivityGate.useThree[setFrameloop]": (s)=>s.setFrameloop
    }["ActivityGate.useThree[setFrameloop]"]);
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "ActivityGate.useThree[gl]": (s)=>s.gl
    }["ActivityGate.useThree[gl]"]);
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActivityGate.useEffect": ()=>{
            const element = gl.domElement;
            const apply = {
                "ActivityGate.useEffect.apply": ()=>{
                    setFrameloop(active.current && !document.hidden ? "always" : "never");
                }
            }["ActivityGate.useEffect.apply"];
            const observer = new IntersectionObserver({
                "ActivityGate.useEffect": (entries)=>{
                    for (const entry of entries)active.current = entry.isIntersecting;
                    apply();
                }
            }["ActivityGate.useEffect"], {
                rootMargin: "120px"
            });
            observer.observe(element);
            const onVisibility = {
                "ActivityGate.useEffect.onVisibility": ()=>apply()
            }["ActivityGate.useEffect.onVisibility"];
            document.addEventListener("visibilitychange", onVisibility);
            return ({
                "ActivityGate.useEffect": ()=>{
                    observer.disconnect();
                    document.removeEventListener("visibilitychange", onVisibility);
                }
            })["ActivityGate.useEffect"];
        }
    }["ActivityGate.useEffect"], [
        gl,
        setFrameloop
    ]);
    return null;
}
_s2(ActivityGate, "+X9Moh1Hy2nTxWMduGwBcGOS67Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c4 = ActivityGate;
/** Perda de contexto WebGL (troca de GPU, aba em segundo plano, driver). */ function ContextGuard({ onLost }) {
    _s3();
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "ContextGuard.useThree[gl]": (s)=>s.gl
    }["ContextGuard.useThree[gl]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContextGuard.useEffect": ()=>{
            const canvas = gl.domElement;
            const handler = {
                "ContextGuard.useEffect.handler": (event)=>{
                    event.preventDefault();
                    onLost?.();
                }
            }["ContextGuard.useEffect.handler"];
            canvas.addEventListener("webglcontextlost", handler);
            return ({
                "ContextGuard.useEffect": ()=>canvas.removeEventListener("webglcontextlost", handler)
            })["ContextGuard.useEffect"];
        }
    }["ContextGuard.useEffect"], [
        gl,
        onLost
    ]);
    return null;
}
_s3(ContextGuard, "kiRT1pwJ5rWQzmu4YAzfxl+s4YE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c5 = ContextGuard;
/**
 * Mede o FPS real e degrada uma vez se o aparelho não acompanhar: primeiro a
 * densidade de pixels, depois o vapor. Medir em vez de estimar.
 */ function PerformanceGuard({ onDegrade }) {
    _s4();
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const degraded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "PerformanceGuard.useFrame": (_, delta)=>{
            if (degraded.current) return;
            frames.current += 1;
            elapsed.current += delta;
            if (elapsed.current >= 2) {
                const fps = frames.current / elapsed.current;
                frames.current = 0;
                elapsed.current = 0;
                if (fps < 40) {
                    degraded.current = true;
                    onDegrade?.();
                }
            }
        }
    }["PerformanceGuard.useFrame"]);
    return null;
}
_s4(PerformanceGuard, "aHyN/2rPAUR8B1NFlNj6aH4z/vk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = PerformanceGuard;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "NazarHeroScene");
__turbopack_context__.k.register(_c1, "SceneContents");
__turbopack_context__.k.register(_c2, "Stage");
__turbopack_context__.k.register(_c3, "SteamSprite");
__turbopack_context__.k.register(_c4, "ActivityGate");
__turbopack_context__.k.register(_c5, "ContextGuard");
__turbopack_context__.k.register(_c6, "PerformanceGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/three/geometry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPlateGeometry",
    ()=>createPlateGeometry,
    "createSifihaGeometry",
    ()=>createSifihaGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
/**
 * Geometria procedural: a esfiha fechada.
 *
 * Por que procedural (e não um GLB): não existe modelo 3D licensed da marca.
 * Um `.glb` de banco de imagens seria "objeto 3D sem relação com o produto" —
 * exatamente o que o briefing proíbe. A forma é construída a partir da
 * assinatura real da esfiha: domo baixo, base assentada e a pinça central com
 * os cordonetes da massa.
 *
 * Quando houver modelo real: `ModelViewer` aceita `model="/models/nazar/hero/esfiha.glb"`
 * e este arquivo deixa de ser usado — o contrato do componente não muda.
 *
 * Custo: ~12k triângulos, 1 geometria, 1 material, zero textura.
 */ function smoothstep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}
function createSifihaGeometry({ widthSegments = 96, heightSegments = 64, handmade = 1 } = {}) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1, widthSegments, heightSegments);
    const position = geometry.attributes.position;
    const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const verticalScale = 0.74; // domo baixo: sfiha é achatada, não bola
    const baseY = -0.52;
    for(let i = 0; i < position.count; i += 1){
        vertex.fromBufferAttribute(position, i);
        const theta = Math.atan2(vertex.z, vertex.x);
        const normalizedY = vertex.y; // -1 (base) → 1 (topo)
        // --- 1. achatamento vertical + base assentada no prato
        let y = normalizedY * verticalScale;
        let radial = Math.hypot(vertex.x, vertex.z);
        if (y < baseY) {
            // achata a base: puxa os pontos para o plano, criando o "pé"
            const overshoot = baseY - y;
            y = baseY + overshoot * 0.12;
            radial *= 1 + overshoot * 0.55;
        }
        // --- 2. pinça central: quanto mais alto, mais a massa é reunida
        const topness = smoothstep(0.15, 0.95, normalizedY);
        const crown = 1 - 0.24 * Math.pow(topness, 1.7);
        // --- 3. cordonetes da massa na parte superior
        const pleat = Math.cos(theta * 8) * 0.052 * topness;
        // --- 4. irregularidade artesanal (baixa frequência, sem ruído)
        const lump = Math.sin(theta * 3 + normalizedY * 2.1) * 0.018 + Math.sin(theta * 5 - normalizedY * 3.4) * 0.009;
        radial *= crown * (1 + pleat * handmade + lump * handmade);
        // --- 5. leve assimetria: nada é perfeitamente round
        const scaleX = 1.035;
        const scaleZ = 0.965;
        position.setXYZ(i, Math.cos(theta) * radial * scaleX, y, Math.sin(theta) * radial * scaleZ);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
}
function createPlateGeometry() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](1.55, 1.42, 0.075, 64, 1, false);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/three/materials.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDoughMaterial",
    ()=>createDoughMaterial,
    "createPlateMaterial",
    ()=>createPlateMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/three/palette.ts [app-client] (ecmascript)");
;
;
function createDoughMaterial() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        uniforms: {
            uColorTop: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].doughTop)
            },
            uColorMid: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].doughMid)
            },
            uColorDeep: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].doughDeep)
            },
            uRimColor: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].rimLight)
            },
            uKeyColor: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].keyLight)
            },
            uKeyDirection: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.55, 0.72, 0.42).normalize()
            },
            uHeat: {
                value: 0
            },
            uMinY: {
                value: -0.52
            },
            uMaxY: {
                value: 0.74
            }
        },
        vertexShader: /* glsl */ `
      varying vec3 vNormalW;
      varying vec3 vViewDir;
      varying vec3 vLocal;
      varying vec3 vLocalNormal;

      void main() {
        vLocal = position;
        vLocalNormal = normalize(normalMatrix * normal);

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDir = normalize(cameraPosition - worldPosition.xyz);

        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
        fragmentShader: /* glsl */ `
      uniform vec3 uColorTop;
      uniform vec3 uColorMid;
      uniform vec3 uColorDeep;
      uniform vec3 uRimColor;
      uniform vec3 uKeyColor;
      uniform vec3 uKeyDirection;
      uniform float uHeat;
      uniform float uMinY;
      uniform float uMaxY;

      varying vec3 vNormalW;
      varying vec3 vViewDir;
      varying vec3 vLocal;
      varying vec3 vLocalNormal;

      // Ruído de valor barato: grão de superfície da massa.
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n000 = hash(i + vec3(0.0, 0.0, 0.0));
        float n100 = hash(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash(i + vec3(1.0, 1.0, 1.0));
        return mix(
          mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
          mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
          f.z
        );
      }

      void main() {
        vec3 n = normalize(vNormalW);
        float height = clamp((vLocal.y - uMinY) / (uMaxY - uMinY), 0.0, 1.0);

        // --- cor assada: base mais tostada, topo mais claro
        vec3 base = mix(uColorDeep, uColorMid, smoothstep(0.02, 0.58, height));
        base = mix(base, uColorTop, smoothstep(0.52, 1.0, height));

        // --- luz com envoltório (diffuse suave, sem terminador duro)
        vec3 key = normalize(uKeyDirection);
        float ndl = dot(n, key);
        float wrap = ndl * 0.72 + 0.28;

        // --- oclusão na base: a massa assenta na sombra do prato
        float ao = mix(0.42, 1.0, smoothstep(0.0, 0.34, height));

        vec3 color = base * (wrap * 1.18) * ao;

        // --- recorte frio: separa o volume do fundo escuro
        float fresnel = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.6);
        color += uRimColor * fresnel * 0.34;

        // --- brilho de massa (especular largo e baixo)
        vec3 halfVector = normalize(key + normalize(vViewDir));
        float spec = pow(max(dot(n, halfVector), 0.0), 26.0);
        color += uKeyColor * spec * 0.28;

        // --- grão de superfície: duas oitavas
        float grain = valueNoise(vLocal * 34.0) * 0.6 + valueNoise(vLocal * 92.0) * 0.4;
        color *= 0.93 + grain * 0.14;

        // --- calor do forno na parte de baixo (usado no toque)
        float heatMask = 1.0 - smoothstep(0.0, 0.6, height);
        color += vec3(0.42, 0.14, 0.05) * heatMask * uHeat;

        gl_FragColor = vec4(color, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
    });
}
function createPlateMaterial() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$three$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneColors"].plate),
        roughness: 0.62,
        metalness: 0.05
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/three/textures.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createContactShadowTexture",
    ()=>createContactShadowTexture,
    "createSteamTexture",
    ()=>createSteamTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
/**
 * Texturas geradas em canvas — zero bytes de rede, zero requisição, e podem
 * ser geradas em qualquer resolução sem perda. usadas para sombra de contato
 * e vapor. Nenhuma imagem é enviada ao cliente além do próprio canvas.
 */ function canvas2d(size) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D indisponível para gerar texturas");
    return ctx;
}
function createContactShadowTexture(size = 256) {
    const ctx = canvas2d(size);
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(0,0,0,0.62)");
    gradient.addColorStop(0.45, "rgba(0,0,0,0.28)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](ctx.canvas);
    texture.needsUpdate = true;
    return texture;
}
function createSteamTexture(size = 128) {
    const ctx = canvas2d(size);
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.34)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](ctx.canvas);
    texture.needsUpdate = true;
    return texture;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0poirvr._.js.map