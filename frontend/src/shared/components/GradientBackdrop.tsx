import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

type GradientVariant = "login" | "main" | "management";

type GradientProps = {
  variant: GradientVariant;
};

type ShaderGradientConfig = Record<string, unknown>;

const gradientConfig: Record<GradientVariant, ShaderGradientConfig> = {
  login: {
    animate: "on",
    bgColor1: "#000000",
    bgColor2: "#000000",
    brightness: 1.2,
    cAzimuthAngle: 180,
    cDistance: 2.4,
    cPolarAngle: 95,
    cameraZoom: 1,
    color1: "#b5eaff",
    color2: "#d385dd",
    color3: "#c9ffe1",
    envPreset: "city",
    grain: "off",
    lightType: "3d",
    positionX: 0,
    positionY: -2.1,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 225,
    shader: "defaults",
    type: "waterPlane",
    uAmplitude: 0,
    uDensity: 1.8,
    uFrequency: 5.5,
    uSpeed: 0.2,
    uStrength: 3,
    uTime: 0.2,
    wireframe: false,
  },
  main: {
    animate: "on",
    bgColor1: "#000000",
    bgColor2: "#000000",
    brightness: 1.5,
    cAzimuthAngle: 60,
    cDistance: 7.1,
    cPolarAngle: 90,
    cameraZoom: 15.29,
    color1: "#8e71bd",
    color2: "#6087b8",
    color3: "#8cffcb",
    envPreset: "dawn",
    grain: "off",
    lightType: "3d",
    positionX: 0,
    positionY: -0.15,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    shader: "defaults",
    type: "sphere",
    uAmplitude: 1.4,
    uDensity: 1.1,
    uFrequency: 5.5,
    uSpeed: 0.1,
    uStrength: 0.4,
    uTime: 0,
    wireframe: false,
  },
  management: {
    animate: "on",
    bgColor1: "#000000",
    bgColor2: "#000000",
    brightness: 1,
    cAzimuthAngle: 180,
    cDistance: 2.8,
    cPolarAngle: 80,
    cameraZoom: 9.1,
    color1: "#6ec8c7",
    color2: "#d385dd",
    color3: "#f3ecf1",
    envPreset: "city",
    grain: "off",
    lightType: "3d",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    rotationX: 50,
    rotationY: 0,
    rotationZ: -60,
    shader: "defaults",
    type: "waterPlane",
    uAmplitude: 0,
    uDensity: 1.5,
    uFrequency: 0,
    uSpeed: 0.3,
    uStrength: 1.5,
    uTime: 8,
    wireframe: false,
  },
};

export function GradientBackdrop({ variant }: GradientProps) {
  const config = gradientConfig[variant];

  return (
    <div className="gradient-backdrop" aria-hidden="true">
      <div className="gradient-backdrop__canvas">
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1.5}
          fov={45}
        >
          <ShaderGradient {...config} />
        </ShaderGradientCanvas>
      </div>
    </div>
  );
}
