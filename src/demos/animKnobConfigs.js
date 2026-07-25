// 自动生成：动画组件 Customize 旋钮配置（基于各组件真实对外 prop API 1:1 提取）
// 生成脚本：scripts/gen_anim_props.cjs + scripts/gen_anim_knobs.cjs + scripts/build_anim_knob_configs.cjs
// 共 31 个组件，305 个旋钮

export const ANIM_KNOB_CONFIGS = {
  "AnimatedContent": [
    {
      prop: "distance",
      label: "距离",
      type: "number",
      default: 100,
      min: 0,
      max: 400,
      step: 4
    },
    {
      prop: "direction",
      label: "方向",
      type: "select",
      default: "vertical",
      options: [{"value":"vertical","label":"vertical"},{"value":"horizontal","label":"horizontal"}]
    },
    {
      prop: "reverse",
      label: "反转",
      type: "boolean",
      default: false
    },
    {
      prop: "duration",
      label: "时长",
      type: "number",
      default: 0.8,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "ease",
      label: "缓动",
      type: "text",
      default: "power3.out"
    },
    {
      prop: "initialOpacity",
      label: "初始不透明度",
      type: "number",
      default: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      prop: "animateOpacity",
      label: "动画不透明度",
      type: "boolean",
      default: true
    },
    {
      prop: "scale",
      label: "缩放",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "threshold",
      label: "阈值",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "delay",
      label: "延迟",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "disappearAfter",
      label: "消失后",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "disappearDuration",
      label: "消失时长",
      type: "number",
      default: 0.5,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "disappearEase",
      label: "消失缓动",
      type: "text",
      default: "power3.in"
    }
  ],
  "Antigravity": [
    {
      prop: "count",
      label: "数量",
      type: "number",
      default: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      prop: "magnetRadius",
      label: "磁吸半径",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "ringRadius",
      label: "环半径",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "waveSpeed",
      label: "波动速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "waveAmplitude",
      label: "波动幅度",
      type: "number",
      default: 5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "particleSize",
      label: "粒子尺寸",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "lerpSpeed",
      label: "插值速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#22d3ee"
    },
    {
      prop: "autoAnimate",
      label: "自动播放",
      type: "boolean",
      default: false
    },
    {
      prop: "particleVariance",
      label: "粒子方差",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "rotationSpeed",
      label: "旋转速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "depthFactor",
      label: "深度系数",
      type: "number",
      default: 5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "pulseSpeed",
      label: "脉冲速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "particleShape",
      label: "粒子形状",
      type: "select",
      default: "capsule",
      options: [{"value":"capsule","label":"capsule"},{"value":"sphere","label":"sphere"},{"value":"box","label":"box"},{"value":"tetrahedron","label":"tetrahedron"}]
    },
    {
      prop: "fieldStrength",
      label: "场强",
      type: "number",
      default: 5,
      min: 0,
      max: 10,
      step: 0.1
    }
  ],
  "BlobCursor": [
    {
      prop: "blobType",
      label: "团块类型",
      type: "select",
      default: "circle",
      options: [{"value":"circle","label":"circle"},{"value":"square","label":"square"}]
    },
    {
      prop: "fillColor",
      label: "填充颜色",
      type: "color",
      default: "#5227FF"
    },
    {
      prop: "trailCount",
      label: "拖尾数量",
      type: "number",
      default: 3,
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      prop: "innerColor",
      label: "内层颜色",
      type: "color",
      default: "#22d3ee"
    },
    {
      prop: "shadowColor",
      label: "阴影颜色",
      type: "color",
      default: "#000000"
    },
    {
      prop: "shadowBlur",
      label: "阴影模糊",
      type: "number",
      default: 5,
      min: 0,
      max: 30,
      step: 0.1
    },
    {
      prop: "shadowOffsetX",
      label: "阴影水平偏移",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "shadowOffsetY",
      label: "阴影垂直偏移",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "filterStdDeviation",
      label: "滤镜标准差",
      type: "number",
      default: 30,
      min: 0,
      max: 120,
      step: 1
    },
    {
      prop: "filterColorMatrixValues",
      label: "滤镜颜色矩阵值",
      type: "text",
      default: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
    },
    {
      prop: "useFilter",
      label: "使用滤镜",
      type: "boolean",
      default: true
    },
    {
      prop: "fastDuration",
      label: "快速时长",
      type: "number",
      default: 0.1,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "slowDuration",
      label: "慢速时长",
      type: "number",
      default: 0.5,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "fastEase",
      label: "快速缓动",
      type: "text",
      default: "power3.out"
    },
    {
      prop: "slowEase",
      label: "慢速缓动",
      type: "text",
      default: "power1.out"
    },
    {
      prop: "zIndex",
      label: "层级",
      type: "number",
      default: 100,
      min: 0,
      max: 400,
      step: 4
    }
  ],
  "ClickSpark": [
    {
      prop: "sparkColor",
      label: "火花颜色",
      type: "color",
      default: "#fff"
    },
    {
      prop: "sparkSize",
      label: "火花尺寸",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "sparkRadius",
      label: "火花半径",
      type: "number",
      default: 15,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "sparkCount",
      label: "火花数量",
      type: "number",
      default: 8,
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      prop: "duration",
      label: "时长",
      type: "number",
      default: 400,
      min: 0,
      max: 5000,
      step: 50
    },
    {
      prop: "easing",
      label: "缓动",
      type: "select",
      default: "ease-out",
      options: [{"value":"linear","label":"linear"},{"value":"ease-in","label":"ease-in"},{"value":"ease-out","label":"ease-out"},{"value":"ease-in-out","label":"ease-in-out"}]
    },
    {
      prop: "extraScale",
      label: "额外缩放",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    }
  ],
  "Crosshair": [
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "white"
    }
  ],
  "Cubes": [
    {
      prop: "gridSize",
      label: "网格尺寸",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "cubeSize",
      label: "方块尺寸",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "maxAngle",
      label: "最大角度",
      type: "number",
      default: 45,
      min: 0,
      max: 360,
      step: 1
    },
    {
      prop: "radius",
      label: "半径",
      type: "number",
      default: 3,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "easing",
      label: "缓动",
      type: "text",
      default: "power3.out"
    },
    {
      prop: "cellGap",
      label: "单元间距",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "borderStyle",
      label: "边框样式",
      type: "text",
      default: "1px solid #fff"
    },
    {
      prop: "faceColor",
      label: "面颜色",
      type: "color",
      default: "#120F17"
    },
    {
      prop: "shadow",
      label: "阴影",
      type: "boolean",
      default: false
    },
    {
      prop: "autoAnimate",
      label: "自动播放",
      type: "boolean",
      default: true
    },
    {
      prop: "rippleOnClick",
      label: "点击波纹",
      type: "boolean",
      default: true
    },
    {
      prop: "rippleColor",
      label: "波纹颜色",
      type: "color",
      default: "#fff"
    },
    {
      prop: "rippleSpeed",
      label: "波纹速度",
      type: "number",
      default: 2,
      min: 0,
      max: 20,
      step: 0.1
    }
  ],
  "CursorGrid": [
    {
      prop: "cellSize",
      label: "单元尺寸",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#22d3ee"
    },
    {
      prop: "radius",
      label: "半径",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "falloff",
      label: "衰减",
      type: "select",
      default: "linear",
      options: [{"value":"linear","label":"linear"},{"value":"smooth","label":"smooth"},{"value":"sharp","label":"sharp"}]
    },
    {
      prop: "holdTime",
      label: "停留时长",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "fadeDuration",
      label: "淡出时长",
      type: "number",
      default: 2500,
      min: 0,
      max: 5000,
      step: 50
    },
    {
      prop: "lineWidth",
      label: "线宽",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "maxOpacity",
      label: "最大不透明度",
      type: "number",
      default: 0.5,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      prop: "fillOpacity",
      label: "填充不透明度",
      type: "number",
      default: 0.5,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      prop: "gridOpacity",
      label: "网格不透明度",
      type: "number",
      default: 0.5,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      prop: "cellRadius",
      label: "单元圆角",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "clickPulse",
      label: "点击脉冲",
      type: "boolean",
      default: false
    },
    {
      prop: "pulseSpeed",
      label: "脉冲速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    }
  ],
  "ElectricBorder": [
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#5227FF"
    },
    {
      prop: "speed",
      label: "速度",
      type: "number",
      default: 1,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "chaos",
      label: "混沌",
      type: "number",
      default: 0.12,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "borderRadius",
      label: "圆角",
      type: "number",
      default: 24,
      min: 0,
      max: 100,
      step: 1
    }
  ],
  "FadeContent": [
    {
      prop: "blur",
      label: "模糊",
      type: "boolean",
      default: false
    },
    {
      prop: "duration",
      label: "时长",
      type: "number",
      default: 1000,
      min: 0,
      max: 5000,
      step: 50
    },
    {
      prop: "ease",
      label: "缓动",
      type: "text",
      default: "power2.out"
    },
    {
      prop: "delay",
      label: "延迟",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "threshold",
      label: "阈值",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "initialOpacity",
      label: "初始不透明度",
      type: "number",
      default: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      prop: "disappearAfter",
      label: "消失后",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "disappearDuration",
      label: "消失时长",
      type: "number",
      default: 0.5,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "disappearEase",
      label: "消失缓动",
      type: "text",
      default: "power2.in"
    }
  ],
  "GhostCursor": [
    {
      prop: "trailLength",
      label: "拖尾长度",
      type: "number",
      default: 50,
      min: 0,
      max: 200,
      step: 1
    },
    {
      prop: "inertia",
      label: "惯性",
      type: "number",
      default: 0.5,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "grainIntensity",
      label: "颗粒强度",
      type: "number",
      default: 0.05,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "bloomStrength",
      label: "泛光强度",
      type: "number",
      default: 0.1,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "bloomRadius",
      label: "泛光半径",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "bloomThreshold",
      label: "泛光阈值",
      type: "number",
      default: 0.025,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "brightness",
      label: "亮度",
      type: "number",
      default: 1,
      min: 0,
      max: 5,
      step: 0.1
    },
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#B497CF"
    },
    {
      prop: "mixBlendMode",
      label: "混合模式",
      type: "text",
      default: "screen"
    },
    {
      prop: "edgeIntensity",
      label: "边缘强度",
      type: "number",
      default: 0,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "fadeDelayMs",
      label: "淡出延迟(ms)",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "fadeDurationMs",
      label: "淡出时长(ms)",
      type: "number",
      default: 2500,
      min: 0,
      max: 5000,
      step: 50
    },
    {
      prop: "zIndex",
      label: "层级",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    }
  ],
  "GlareHover": [
    {
      prop: "width",
      label: "宽度",
      type: "text",
      default: "500px"
    },
    {
      prop: "height",
      label: "高度",
      type: "text",
      default: "500px"
    },
    {
      prop: "background",
      label: "背景",
      type: "color",
      default: "#000"
    },
    {
      prop: "borderRadius",
      label: "圆角",
      type: "text",
      default: "10px"
    },
    {
      prop: "borderColor",
      label: "边框颜色",
      type: "color",
      default: "#333"
    },
    {
      prop: "glareColor",
      label: "高光颜色",
      type: "color",
      default: "#ffffff"
    },
    {
      prop: "glareOpacity",
      label: "高光不透明度",
      type: "number",
      default: 0.5,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      prop: "glareAngle",
      label: "高光角度",
      type: "number",
      default: -45,
      min: -68,
      max: 360,
      step: 1
    },
    {
      prop: "glareSize",
      label: "高光尺寸",
      type: "number",
      default: 250,
      min: 0,
      max: 1000,
      step: 10
    },
    {
      prop: "transitionDuration",
      label: "过渡时长",
      type: "number",
      default: 650,
      min: 0,
      max: 5000,
      step: 50
    },
    {
      prop: "playOnce",
      label: "仅播放一次",
      type: "boolean",
      default: false
    }
  ],
  "GradualBlur": [
    {
      prop: "position",
      label: "位置",
      type: "text",
      default: "top"
    },
    {
      prop: "strength",
      label: "强度",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "divCount",
      label: "层数量",
      type: "number",
      default: 10,
      min: 0,
      max: 50,
      step: 1
    },
    {
      prop: "exponential",
      label: "指数",
      type: "boolean",
      default: false
    },
    {
      prop: "animated",
      label: "动画",
      type: "boolean",
      default: true
    },
    {
      prop: "duration",
      label: "时长",
      type: "text",
      default: "0.3s"
    },
    {
      prop: "easing",
      label: "缓动",
      type: "text",
      default: "ease-out"
    },
    {
      prop: "opacity",
      label: "不透明度",
      type: "number",
      default: 1,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      prop: "curve",
      label: "曲线",
      type: "text",
      default: "ease-out"
    },
    {
      prop: "preset",
      label: "预设",
      type: "text",
      default: ""
    }
  ],
  "ImageTrail": [
    {
      prop: "variant",
      label: "变体",
      type: "select",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1,
      options: [{"value":1,"label":"1"},{"value":2,"label":"2"},{"value":3,"label":"3"},{"value":4,"label":"4"},{"value":5,"label":"5"},{"value":6,"label":"6"},{"value":7,"label":"7"},{"value":8,"label":"8"}]
    }
  ],
  "LaserFlow": [
    {
      prop: "wispDensity",
      label: "薄雾密度",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "mouseSmoothTime",
      label: "鼠标平滑时间",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "mouseTiltStrength",
      label: "鼠标倾斜强度",
      type: "number",
      default: 0.01,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "horizontalBeamOffset",
      label: "水平光束偏移",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "verticalBeamOffset",
      label: "垂直光束偏移",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "flowSpeed",
      label: "流动速度",
      type: "number",
      default: 0.35,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "verticalSizing",
      label: "垂直尺寸",
      type: "number",
      default: 2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "horizontalSizing",
      label: "水平尺寸",
      type: "number",
      default: 0.5,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "fogIntensity",
      label: "雾强度",
      type: "number",
      default: 0.45,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "fogScale",
      label: "雾缩放",
      type: "number",
      default: 0.3,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "wispSpeed",
      label: "薄雾速度",
      type: "number",
      default: 15,
      min: 0,
      max: 20,
      step: 1
    },
    {
      prop: "wispIntensity",
      label: "薄雾强度",
      type: "number",
      default: 5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "flowStrength",
      label: "流动强度",
      type: "number",
      default: 0.25,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "decay",
      label: "衰减",
      type: "number",
      default: 1.1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "falloffStart",
      label: "衰减起始",
      type: "number",
      default: 1.2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "fogFallSpeed",
      label: "雾降落速度",
      type: "number",
      default: 0.6,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#FF79C6"
    }
  ],
  "LogoLoop": [
    {
      prop: "speed",
      label: "速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "direction",
      label: "方向",
      type: "select",
      default: "left",
      options: [{"value":"left","label":"left"},{"value":"right","label":"right"},{"value":"up","label":"up"},{"value":"down","label":"down"}]
    },
    {
      prop: "width",
      label: "宽度",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "logoHeight",
      label: "标志高度",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "gap",
      label: "间距",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "pauseOnHover",
      label: "悬停暂停",
      type: "boolean",
      default: false
    },
    {
      prop: "hoverSpeed",
      label: "悬停速度",
      type: "number",
      default: 10,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "fadeOut",
      label: "淡出",
      type: "boolean",
      default: false
    },
    {
      prop: "fadeOutColor",
      label: "淡出颜色",
      type: "color",
      default: "#000000"
    },
    {
      prop: "scaleOnHover",
      label: "缩放悬停",
      type: "boolean",
      default: false
    }
  ],
  "MagicRings": [
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#fc42ff"
    },
    {
      prop: "colorTwo",
      label: "辅助颜色",
      type: "color",
      default: "#42fcff"
    },
    {
      prop: "speed",
      label: "速度",
      type: "number",
      default: 1,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      prop: "ringCount",
      label: "环数量",
      type: "number",
      default: 6,
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      prop: "attenuation",
      label: "衰减",
      type: "number",
      default: 10,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "lineThickness",
      label: "线厚",
      type: "number",
      default: 2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "baseRadius",
      label: "基础半径",
      type: "number",
      default: 0.35,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "radiusStep",
      label: "半径步长",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "scaleRate",
      label: "缩放速率",
      type: "number",
      default: 0.1,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "opacity",
      label: "不透明度",
      type: "number",
      default: 1,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      prop: "blur",
      label: "模糊",
      type: "number",
      default: 0,
      min: 0,
      max: 30,
      step: 0.1
    },
    {
      prop: "noiseAmount",
      label: "噪点强度",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "rotation",
      label: "旋转",
      type: "number",
      default: 0,
      min: 0,
      max: 360,
      step: 0.1
    },
    {
      prop: "ringGap",
      label: "环间隙",
      type: "number",
      default: 1.5,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "fadeIn",
      label: "淡入",
      type: "number",
      default: 0.7,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "fadeOut",
      label: "淡出",
      type: "number",
      default: 0.5,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "followMouse",
      label: "跟随鼠标",
      type: "boolean",
      default: false
    },
    {
      prop: "mouseInfluence",
      label: "鼠标影响",
      type: "number",
      default: 0.2,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "hoverScale",
      label: "悬停缩放",
      type: "number",
      default: 1.2,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "parallax",
      label: "视差",
      type: "number",
      default: 0.05,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "clickBurst",
      label: "点击爆发",
      type: "boolean",
      default: false
    }
  ],
  "Magnet": [
    {
      prop: "padding",
      label: "内边距",
      type: "number",
      default: 100,
      min: 0,
      max: 400,
      step: 4
    },
    {
      prop: "disabled",
      label: "禁用",
      type: "boolean",
      default: false
    },
    {
      prop: "magnetStrength",
      label: "磁吸强度",
      type: "number",
      default: 2,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "activeTransition",
      label: "激活过渡",
      type: "text",
      default: "transform 0.3s ease-out"
    },
    {
      prop: "inactiveTransition",
      label: "非激活过渡",
      type: "text",
      default: "transform 0.5s ease-in-out"
    }
  ],
  "MagnetLines": [
    {
      prop: "rows",
      label: "行数",
      type: "number",
      default: 9,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "columns",
      label: "列数",
      type: "number",
      default: 9,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "containerSize",
      label: "容器尺寸",
      type: "text",
      default: "80vmin"
    },
    {
      prop: "lineColor",
      label: "线条颜色",
      type: "color",
      default: "#efefef"
    },
    {
      prop: "lineWidth",
      label: "线宽",
      type: "text",
      default: "1vmin"
    },
    {
      prop: "lineHeight",
      label: "线高",
      type: "text",
      default: "6vmin"
    },
    {
      prop: "baseAngle",
      label: "基础角度",
      type: "number",
      default: -10,
      min: -15,
      max: 360,
      step: 1
    }
  ],
  "MetaBalls": [
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#ffffff"
    },
    {
      prop: "speed",
      label: "速度",
      type: "number",
      default: 0.3,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "enableMouseInteraction",
      label: "启用鼠标交互",
      type: "boolean",
      default: true
    },
    {
      prop: "hoverSmoothness",
      label: "悬停平滑度",
      type: "number",
      default: 0.05,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "animationSize",
      label: "动画尺寸",
      type: "number",
      default: 30,
      min: 0,
      max: 120,
      step: 1
    },
    {
      prop: "ballCount",
      label: "球数量",
      type: "number",
      default: 15,
      min: 0,
      max: 50,
      step: 1
    },
    {
      prop: "clumpFactor",
      label: "聚团系数",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "cursorBallSize",
      label: "光标球尺寸",
      type: "number",
      default: 3,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "cursorBallColor",
      label: "光标球颜色",
      type: "color",
      default: "#ffffff"
    },
    {
      prop: "enableTransparency",
      label: "启用透明",
      type: "boolean",
      default: false
    }
  ],
  "Noise": [
    {
      prop: "patternSize",
      label: "图案尺寸",
      type: "number",
      default: 250,
      min: 0,
      max: 1000,
      step: 10
    },
    {
      prop: "patternScaleX",
      label: "横向图案缩放",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "patternScaleY",
      label: "纵向图案缩放",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "patternRefreshInterval",
      label: "图案刷新间隔",
      type: "number",
      default: 2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "patternAlpha",
      label: "图案不透明度",
      type: "number",
      default: 15,
      min: 0,
      max: 23,
      step: 1
    }
  ],
  "OrbitImages": [
    {
      prop: "altPrefix",
      label: "替代文本前缀",
      type: "text",
      default: "Orbiting image"
    },
    {
      prop: "shape",
      label: "形状",
      type: "select",
      default: "ellipse",
      options: [{"value":"ellipse","label":"ellipse"},{"value":"circle","label":"circle"},{"value":"square","label":"square"},{"value":"rectangle","label":"rectangle"},{"value":"triangle","label":"triangle"},{"value":"star","label":"star"},{"value":"heart","label":"heart"},{"value":"infinity","label":"infinity"},{"value":"wave","label":"wave"},{"value":"custom","label":"custom"}]
    },
    {
      prop: "baseWidth",
      label: "基础宽度",
      type: "number",
      default: 1400,
      min: 0,
      max: 5600,
      step: 56
    },
    {
      prop: "radiusX",
      label: "横向半径",
      type: "number",
      default: 700,
      min: 0,
      max: 2800,
      step: 28
    },
    {
      prop: "radiusY",
      label: "纵向半径",
      type: "number",
      default: 170,
      min: 0,
      max: 680,
      step: 7
    },
    {
      prop: "radius",
      label: "半径",
      type: "number",
      default: 300,
      min: 0,
      max: 1200,
      step: 12
    },
    {
      prop: "starPoints",
      label: "星形点数",
      type: "number",
      default: 5,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "starInnerRatio",
      label: "星形内比",
      type: "number",
      default: 0.5,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "rotation",
      label: "旋转",
      type: "number",
      default: -8,
      min: -12,
      max: 360,
      step: 0.1
    },
    {
      prop: "duration",
      label: "时长",
      type: "number",
      default: 40,
      min: 0,
      max: 5000,
      step: 1
    },
    {
      prop: "itemSize",
      label: "项尺寸",
      type: "number",
      default: 64,
      min: 0,
      max: 256,
      step: 1
    },
    {
      prop: "direction",
      label: "方向",
      type: "select",
      default: "normal",
      options: [{"value":"normal","label":"normal"},{"value":"reverse","label":"reverse"}]
    },
    {
      prop: "fill",
      label: "填充",
      type: "boolean",
      default: true
    },
    {
      prop: "width",
      label: "宽度",
      type: "number",
      default: 100,
      min: 0,
      max: 400,
      step: 4
    },
    {
      prop: "height",
      label: "高度",
      type: "number",
      default: 100,
      min: 0,
      max: 400,
      step: 4
    },
    {
      prop: "showPath",
      label: "显示路径",
      type: "boolean",
      default: false
    },
    {
      prop: "pathColor",
      label: "路径颜色",
      type: "color",
      default: "#22d3ee"
    },
    {
      prop: "pathWidth",
      label: "路径宽度",
      type: "number",
      default: 2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "easing",
      label: "缓动",
      type: "select",
      default: "linear",
      options: [{"value":"linear","label":"linear"},{"value":"easeIn","label":"easeIn"},{"value":"easeOut","label":"easeOut"},{"value":"easeInOut","label":"easeInOut"}]
    },
    {
      prop: "paused",
      label: "暂停",
      type: "boolean",
      default: false
    },
    {
      prop: "responsive",
      label: "响应式",
      type: "boolean",
      default: false
    }
  ],
  "PixelTrail": [
    {
      prop: "gridSize",
      label: "网格尺寸",
      type: "number",
      default: 40,
      min: 0,
      max: 160,
      step: 1
    },
    {
      prop: "trailSize",
      label: "拖尾尺寸",
      type: "number",
      default: 0.1,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "maxAge",
      label: "最大时长",
      type: "number",
      default: 250,
      min: 0,
      max: 1000,
      step: 10
    },
    {
      prop: "interpolate",
      label: "插值",
      type: "number",
      default: 0.1,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      prop: "easingFunction",
      label: "缓动函数",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1
    },
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "#ffffff"
    }
  ],
  "PixelTransition": [
    {
      prop: "gridSize",
      label: "网格尺寸",
      type: "number",
      default: 7,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "pixelColor",
      label: "像素颜色",
      type: "color",
      default: "currentColor"
    },
    {
      prop: "animationStepDuration",
      label: "动画步长时长",
      type: "number",
      default: 0.3,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "once",
      label: "仅一次",
      type: "boolean",
      default: false
    },
    {
      prop: "aspectRatio",
      label: "宽高比",
      type: "text",
      default: "100%"
    }
  ],
  "Ribbons": [
    {
      prop: "baseSpring",
      label: "基础弹性",
      type: "number",
      default: 0.03,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "baseFriction",
      label: "基础摩擦",
      type: "number",
      default: 0.9,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "baseThickness",
      label: "基础厚度",
      type: "number",
      default: 30,
      min: 0,
      max: 120,
      step: 1
    },
    {
      prop: "offsetFactor",
      label: "偏移系数",
      type: "number",
      default: 0.05,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "maxAge",
      label: "最大时长",
      type: "number",
      default: 500,
      min: 0,
      max: 2000,
      step: 20
    },
    {
      prop: "pointCount",
      label: "点数量",
      type: "number",
      default: 50,
      min: 0,
      max: 50,
      step: 1
    },
    {
      prop: "speedMultiplier",
      label: "速度倍率",
      type: "number",
      default: 0.6,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "enableFade",
      label: "启用淡出",
      type: "boolean",
      default: false
    },
    {
      prop: "enableShaderEffect",
      label: "启用着色器效果",
      type: "boolean",
      default: false
    },
    {
      prop: "effectAmplitude",
      label: "效果幅度",
      type: "number",
      default: 2,
      min: 0,
      max: 10,
      step: 0.1
    }
  ],
  "ShapeBlur": [
    {
      prop: "variation",
      label: "变化",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "shapeSize",
      label: "形状尺寸",
      type: "number",
      default: 1.2,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "roundness",
      label: "圆度",
      type: "number",
      default: 0.4,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "borderSize",
      label: "边框尺寸",
      type: "number",
      default: 0.05,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "circleSize",
      label: "圆形尺寸",
      type: "number",
      default: 0.3,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "circleEdge",
      label: "圆形边缘",
      type: "number",
      default: 0.5,
      min: 0,
      max: 100,
      step: 0.01
    }
  ],
  "SplashCursor": [
    {
      prop: "COLOR",
      label: "颜色",
      type: "color",
      default: "#ff0000"
    }
  ],
  "StarBorder": [
    {
      prop: "color",
      label: "颜色",
      type: "color",
      default: "white"
    },
    {
      prop: "speed",
      label: "速度",
      type: "text",
      default: "6s"
    }
  ],
  "StickerPeel": [
    {
      prop: "rotate",
      label: "旋转角",
      type: "number",
      default: 30,
      min: 0,
      max: 360,
      step: 1
    },
    {
      prop: "peelBackHoverPct",
      label: "剥回悬停百分比",
      type: "number",
      default: 30,
      min: 0,
      max: 120,
      step: 1
    },
    {
      prop: "peelBackActivePct",
      label: "剥回激活百分比",
      type: "number",
      default: 40,
      min: 0,
      max: 160,
      step: 1
    },
    {
      prop: "peelEasing",
      label: "剥落缓动",
      type: "text",
      default: "power3.out"
    },
    {
      prop: "peelHoverEasing",
      label: "剥落悬停缓动",
      type: "text",
      default: "power2.out"
    },
    {
      prop: "width",
      label: "宽度",
      type: "number",
      default: 200,
      min: 0,
      max: 800,
      step: 8
    },
    {
      prop: "shadowIntensity",
      label: "阴影强度",
      type: "number",
      default: 0.6,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "lightingIntensity",
      label: "光照强度",
      type: "number",
      default: 0.1,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "peelDirection",
      label: "剥落方向",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    }
  ],
  "Strands": [
    {
      prop: "count",
      label: "数量",
      type: "number",
      default: 3,
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      prop: "speed",
      label: "速度",
      type: "number",
      default: 0.5,
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      prop: "amplitude",
      label: "幅度",
      type: "number",
      default: 1,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "waviness",
      label: "波动",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "thickness",
      label: "厚度",
      type: "number",
      default: 0.7,
      min: 0,
      max: 100,
      step: 0.01
    },
    {
      prop: "glow",
      label: "辉光",
      type: "number",
      default: 2.6,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "taper",
      label: "锥形",
      type: "number",
      default: 3,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "spread",
      label: "扩散",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "hueShift",
      label: "色相偏移",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "intensity",
      label: "强度",
      type: "number",
      default: 0.6,
      min: 0,
      max: 10,
      step: 0.01
    },
    {
      prop: "saturation",
      label: "饱和度",
      type: "number",
      default: 1.5,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "opacity",
      label: "不透明度",
      type: "number",
      default: 1,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      prop: "scale",
      label: "缩放",
      type: "number",
      default: 1.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      prop: "glass",
      label: "玻璃",
      type: "boolean",
      default: false
    },
    {
      prop: "refraction",
      label: "折射",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "dispersion",
      label: "色散",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      prop: "glassSize",
      label: "玻璃尺寸",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 0.1
    }
  ],
  "TargetCursor": [
    {
      prop: "targetSelector",
      label: "目标选择器",
      type: "text",
      default: ".cursor-target"
    },
    {
      prop: "spinDuration",
      label: "自转时长",
      type: "number",
      default: 2,
      min: 0,
      max: 5000,
      step: 0.1
    },
    {
      prop: "hideDefaultCursor",
      label: "隐藏默认光标",
      type: "boolean",
      default: true
    },
    {
      prop: "hoverDuration",
      label: "悬停时长",
      type: "number",
      default: 0.2,
      min: 0,
      max: 5000,
      step: 0.01
    },
    {
      prop: "parallaxOn",
      label: "视差",
      type: "boolean",
      default: true
    },
    {
      prop: "cursorColor",
      label: "光标颜色",
      type: "color",
      default: "#ffffff"
    },
    {
      prop: "cursorColorOnTarget",
      label: "目标光标颜色",
      type: "text",
      default: ""
    }
  ],
};

export const ANIM_DEFAULTS = {
  "AnimatedContent": {
    "distance": 100,
    "direction": "vertical",
    "reverse": false,
    "duration": 0.8,
    "ease": "power3.out",
    "initialOpacity": 0,
    "animateOpacity": true,
    "scale": 1,
    "threshold": 0.1,
    "delay": 0,
    "disappearAfter": 0,
    "disappearDuration": 0.5,
    "disappearEase": "power3.in"
  },
  "Antigravity": {
    "count": 25,
    "magnetRadius": 50,
    "ringRadius": 50,
    "waveSpeed": 10,
    "waveAmplitude": 5,
    "particleSize": 50,
    "lerpSpeed": 10,
    "color": "#22d3ee",
    "autoAnimate": false,
    "particleVariance": 50,
    "rotationSpeed": 10,
    "depthFactor": 5,
    "pulseSpeed": 10,
    "particleShape": "capsule",
    "fieldStrength": 5
  },
  "BlobCursor": {
    "blobType": "circle",
    "fillColor": "#5227FF",
    "trailCount": 3,
    "innerColor": "#22d3ee",
    "shadowColor": "#000000",
    "shadowBlur": 5,
    "shadowOffsetX": 10,
    "shadowOffsetY": 10,
    "filterStdDeviation": 30,
    "filterColorMatrixValues": "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
    "useFilter": true,
    "fastDuration": 0.1,
    "slowDuration": 0.5,
    "fastEase": "power3.out",
    "slowEase": "power1.out",
    "zIndex": 100
  },
  "ClickSpark": {
    "sparkColor": "#fff",
    "sparkSize": 10,
    "sparkRadius": 15,
    "sparkCount": 8,
    "duration": 400,
    "easing": "ease-out",
    "extraScale": 1
  },
  "Crosshair": {
    "color": "white"
  },
  "Cubes": {
    "gridSize": 10,
    "cubeSize": 50,
    "maxAngle": 45,
    "radius": 3,
    "easing": "power3.out",
    "cellGap": 50,
    "borderStyle": "1px solid #fff",
    "faceColor": "#120F17",
    "shadow": false,
    "autoAnimate": true,
    "rippleOnClick": true,
    "rippleColor": "#fff",
    "rippleSpeed": 2
  },
  "CursorGrid": {
    "cellSize": 50,
    "color": "#22d3ee",
    "radius": 50,
    "falloff": "linear",
    "holdTime": 50,
    "fadeDuration": 2500,
    "lineWidth": 50,
    "maxOpacity": 0.5,
    "fillOpacity": 0.5,
    "gridOpacity": 0.5,
    "cellRadius": 50,
    "clickPulse": false,
    "pulseSpeed": 10
  },
  "ElectricBorder": {
    "color": "#5227FF",
    "speed": 1,
    "chaos": 0.12,
    "borderRadius": 24
  },
  "FadeContent": {
    "blur": false,
    "duration": 1000,
    "ease": "power2.out",
    "delay": 0,
    "threshold": 0.1,
    "initialOpacity": 0,
    "disappearAfter": 0,
    "disappearDuration": 0.5,
    "disappearEase": "power2.in"
  },
  "GhostCursor": {
    "trailLength": 50,
    "inertia": 0.5,
    "grainIntensity": 0.05,
    "bloomStrength": 0.1,
    "bloomRadius": 1,
    "bloomThreshold": 0.025,
    "brightness": 1,
    "color": "#B497CF",
    "mixBlendMode": "screen",
    "edgeIntensity": 0,
    "fadeDelayMs": 50,
    "fadeDurationMs": 2500,
    "zIndex": 10
  },
  "GlareHover": {
    "width": "500px",
    "height": "500px",
    "background": "#000",
    "borderRadius": "10px",
    "borderColor": "#333",
    "glareColor": "#ffffff",
    "glareOpacity": 0.5,
    "glareAngle": -45,
    "glareSize": 250,
    "transitionDuration": 650,
    "playOnce": false
  },
  "GradualBlur": {
    "position": "top",
    "strength": 1,
    "divCount": 10,
    "exponential": false,
    "animated": true,
    "duration": "0.3s",
    "easing": "ease-out",
    "opacity": 1,
    "curve": "ease-out",
    "preset": ""
  },
  "ImageTrail": {
    "variant": 1
  },
  "LaserFlow": {
    "wispDensity": 1,
    "mouseSmoothTime": 0,
    "mouseTiltStrength": 0.01,
    "horizontalBeamOffset": 0.1,
    "verticalBeamOffset": 0,
    "flowSpeed": 0.35,
    "verticalSizing": 2,
    "horizontalSizing": 0.5,
    "fogIntensity": 0.45,
    "fogScale": 0.3,
    "wispSpeed": 15,
    "wispIntensity": 5,
    "flowStrength": 0.25,
    "decay": 1.1,
    "falloffStart": 1.2,
    "fogFallSpeed": 0.6,
    "color": "#FF79C6"
  },
  "LogoLoop": {
    "speed": 10,
    "direction": "left",
    "width": 50,
    "logoHeight": 50,
    "gap": 50,
    "pauseOnHover": false,
    "hoverSpeed": 10,
    "fadeOut": false,
    "fadeOutColor": "#000000",
    "scaleOnHover": false
  },
  "MagicRings": {
    "color": "#fc42ff",
    "colorTwo": "#42fcff",
    "speed": 1,
    "ringCount": 6,
    "attenuation": 10,
    "lineThickness": 2,
    "baseRadius": 0.35,
    "radiusStep": 0.1,
    "scaleRate": 0.1,
    "opacity": 1,
    "blur": 0,
    "noiseAmount": 0.1,
    "rotation": 0,
    "ringGap": 1.5,
    "fadeIn": 0.7,
    "fadeOut": 0.5,
    "followMouse": false,
    "mouseInfluence": 0.2,
    "hoverScale": 1.2,
    "parallax": 0.05,
    "clickBurst": false
  },
  "Magnet": {
    "padding": 100,
    "disabled": false,
    "magnetStrength": 2,
    "activeTransition": "transform 0.3s ease-out",
    "inactiveTransition": "transform 0.5s ease-in-out"
  },
  "MagnetLines": {
    "rows": 9,
    "columns": 9,
    "containerSize": "80vmin",
    "lineColor": "#efefef",
    "lineWidth": "1vmin",
    "lineHeight": "6vmin",
    "baseAngle": -10
  },
  "MetaBalls": {
    "color": "#ffffff",
    "speed": 0.3,
    "enableMouseInteraction": true,
    "hoverSmoothness": 0.05,
    "animationSize": 30,
    "ballCount": 15,
    "clumpFactor": 1,
    "cursorBallSize": 3,
    "cursorBallColor": "#ffffff",
    "enableTransparency": false
  },
  "Noise": {
    "patternSize": 250,
    "patternScaleX": 1,
    "patternScaleY": 1,
    "patternRefreshInterval": 2,
    "patternAlpha": 15
  },
  "OrbitImages": {
    "altPrefix": "Orbiting image",
    "shape": "ellipse",
    "baseWidth": 1400,
    "radiusX": 700,
    "radiusY": 170,
    "radius": 300,
    "starPoints": 5,
    "starInnerRatio": 0.5,
    "rotation": -8,
    "duration": 40,
    "itemSize": 64,
    "direction": "normal",
    "fill": true,
    "width": 100,
    "height": 100,
    "showPath": false,
    "pathColor": "#22d3ee",
    "pathWidth": 2,
    "easing": "linear",
    "paused": false,
    "responsive": false
  },
  "PixelTrail": {
    "gridSize": 40,
    "trailSize": 0.1,
    "maxAge": 250,
    "interpolate": 0.1,
    "easingFunction": 50,
    "color": "#ffffff"
  },
  "PixelTransition": {
    "gridSize": 7,
    "pixelColor": "currentColor",
    "animationStepDuration": 0.3,
    "once": false,
    "aspectRatio": "100%"
  },
  "Ribbons": {
    "baseSpring": 0.03,
    "baseFriction": 0.9,
    "baseThickness": 30,
    "offsetFactor": 0.05,
    "maxAge": 500,
    "pointCount": 50,
    "speedMultiplier": 0.6,
    "enableFade": false,
    "enableShaderEffect": false,
    "effectAmplitude": 2
  },
  "ShapeBlur": {
    "variation": 0,
    "shapeSize": 1.2,
    "roundness": 0.4,
    "borderSize": 0.05,
    "circleSize": 0.3,
    "circleEdge": 0.5
  },
  "SplashCursor": {
    "COLOR": "#ff0000"
  },
  "StarBorder": {
    "color": "white",
    "speed": "6s"
  },
  "StickerPeel": {
    "rotate": 30,
    "peelBackHoverPct": 30,
    "peelBackActivePct": 40,
    "peelEasing": "power3.out",
    "peelHoverEasing": "power2.out",
    "width": 200,
    "shadowIntensity": 0.6,
    "lightingIntensity": 0.1,
    "peelDirection": 0
  },
  "Strands": {
    "count": 3,
    "speed": 0.5,
    "amplitude": 1,
    "waviness": 1,
    "thickness": 0.7,
    "glow": 2.6,
    "taper": 3,
    "spread": 1,
    "hueShift": 0,
    "intensity": 0.6,
    "saturation": 1.5,
    "opacity": 1,
    "scale": 1.5,
    "glass": false,
    "refraction": 1,
    "dispersion": 1,
    "glassSize": 1
  },
  "TargetCursor": {
    "targetSelector": ".cursor-target",
    "spinDuration": 2,
    "hideDefaultCursor": true,
    "hoverDuration": 0.2,
    "parallaxOn": true,
    "cursorColor": "#ffffff",
    "cursorColorOnTarget": ""
  },
};
