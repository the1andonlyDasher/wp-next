
import { ContactShadows, Environment, Float, GradientTexture, GradientType, Grid, RoundedBox, Shadow } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { Model } from "./Rapp_final";
import { forwardRef } from "react";


interface glProps {
  eventSource?: any;
}

const GL = (props: glProps) => {
  const v: Vector3 = [0, 2, 20]
  const gType: any = GradientType.Radial
  return (
    <div className="canvas__wrapper">
      <Canvas camera={{ position: [0, 4, 10], lookAt: () => v }} dpr={[1, 1.5]} gl={{ antialias: true }} eventSource={props.eventSource}>
        {/* <color attach="background" args={["#EEE8D2"]} /> */}
        <GradientTexture attach="background" colors={["#000", "#111"]} type={gType} stops={[0, 1]} size={8} rotation={-Math.PI / 3} />
        <pointLight position={[2, 2, -2]} intensity={100} color={"red"} />
        <fog attach="fog" args={["#000", 5, 10]}></fog>
        <ContactShadows far={4} blur={7} />
        <Float>
          <RoundedBox radius={0.4} args={[4, 4, 4]} position={[0, 4, 0]} rotation={[Math.PI / 2, Math.PI / 3, Math.PI / 4]}>
            <meshStandardMaterial color={"#000"} />
          </RoundedBox>
        </Float>
        <Grid fadeDistance={30} fadeStrength={3} rotation={[Math.PI / 2, Math.PI / -19, 0]} position={[0, 2, -7]} cellSize={10} sectionSize={5} infiniteGrid cellColor={"#111"} sectionColor={"#000"} />
        <ambientLight intensity={0.5} />
        <Environment preset="lobby" blur={2} />
      </Canvas>
    </div>
  );
}

const WebGL = forwardRef<any, glProps>((props, ref) => (
  <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;