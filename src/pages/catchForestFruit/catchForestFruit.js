import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree, extend } from "react-three-fiber"
import "./catchForestFruit.css"

import grass_light from "./textures/grasslight-big.jpg"
import block_texture_img from "./textures/atlas.png"
import block_texture_top_img from "./textures/atlas_top.png"
import block_texture_bottom_img from "./textures/atlas_bottom.png"
// https://minecraft.gamepedia.com/List_of_block_textures

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Object3D } from 'three'
import SelfAvatar from "./js/SelfAvatar"

// very cool example: https://jblaha.art/sketchbook/0.4/
// current state google search: three.js third person controls

// more info for:

// pointerlock enable/disable:
    // https://www.w3.org/TR/pointerlock/
    // document.body.requestPointerLock()
    // to exit pointerlock enter: document.exitPointerLock()
    // to get the pointerlocked element document.pointerLockElement
    // event listener in project 

// camera/avatar:
    // camera/avatar rotation/look: https://github.com/PiusNyakoojo/PlayerControls/blob/master/PlayerControls.js
    // camera follow avatar: https://discourse.threejs.org/t/thirdpersoncontrols/14829
    // (failed) avatar add to control: https://discourse.threejs.org/t/thirdpersoncontrols/14829/3

// camera:
    // PointerLockControls(only for camera): https://threejs.org/examples/?q=controls#misc_controls_pointerlock

// material sides:
    // https://threejsfundamentals.org/threejs/lessons/threejs-textures.html for material sides
    // https://medium.com/@joooooo308/react-three-fiber-lets-create-a-dice-b83f322d28ea

// usage:
// effect hooks:
    // https://reactjs.org/docs/hooks-effect.html

// look camera and avatar to mousepointer:
    // make a group named marker (there you can set the x mousemovement)
    // make a new group named y_marker in marker (there you can set the y mousemovement)
    // explain: if you use marker for both and the marker change the x value,
    //      the y angle won't be forward, it maybe will be on the left and right
    // (hint: if you don't understand, test it out)

// PointerLockControls:
    // extend({ PointerLockControls })

    // const controlsRef = useRef()
    // <pointerLockControls
    //     ref={ controlsRef }
    //     args={[camera, gl.domElement]}
    // />

    // controlsRef.current.lock()
    // controlsRef.current.unlock()

    // controlsRef.current.moveForward(+/-speed)
    // controlsRef.current.moveRight(+/-speed)

let isLoaded = false
let not_allowed = []
const ground_height = -1.5
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
}
let escape_game
let isLocked = false

const actionByKey = (key) => {
    key = key.toLowerCase()
    return keys[key]
}

const CreateBlock = (props) => {
    var test_block = useRef()
    var test_block2 = useRef()
    // not_allowed.push(test_block)
    not_allowed.push(test_block2)

    const block_texture = useMemo(() => new THREE.TextureLoader().load(block_texture_img), [])
    const block_texture_bottom = useMemo(() => new THREE.TextureLoader().load(block_texture_bottom_img), [])
    const block_texture_top = useMemo(() => new THREE.TextureLoader().load(block_texture_top_img), [])
    block_texture.magFilter = THREE.NearestFilter
    block_texture_top.magFilter = THREE.NearestFilter
    block_texture_bottom.magFilter = THREE.NearestFilter

    return(
        <>
            <mesh position={[ props.position[0], props.position[1]-1, props.position[2] ]} ref={ test_block2 }>
                <boxGeometry args={[ 4, 0.1, 4 ]} attach="geometry" />
                <meshPhongMaterial color opacity={0} transparent={true} />
            </mesh>
            <mesh position={[ props.position[0], props.position[1], props.position[2] ]} ref={ test_block }>
                <boxGeometry args={[ 2, 2, 2 ]} attach="geometry" />
                <meshBasicMaterial map={block_texture} attachArray="material" />
                <meshBasicMaterial map={block_texture} attachArray="material" />
                <meshBasicMaterial map={block_texture_top} attachArray="material" />
                <meshBasicMaterial map={block_texture_bottom} attachArray="material" />
                <meshBasicMaterial map={block_texture} attachArray="material" />
                <meshBasicMaterial map={block_texture} attachArray="material" />
            </mesh>
        </>
    )
}

const CreateCanvas = () => {
    useEffect(() => {
        escape_game = document.querySelector(".escape_game")
        document.addEventListener('pointerlockerror', () => {
            console.log("Error")
            setTimeout(() => {
                try {
                    document.body.requestPointerLock()
                } catch(error) {
                    alert("ERROR!\nRestart the page!")
                }
            }, 1000)
        }, false)
        
        if (escape_game !== undefined) {
            escape_game.addEventListener("click", () => {
                escape_game.style.display = "none"
                document.body.requestPointerLock()
            })
        }
        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement == null) {
                isLocked = false
                escape_game.style.display = "block"
            } else {
                isLocked = true
                escape_game.style.display = "none"
            }
        })
    }, [])
    const ground_texture = useMemo(() => new THREE.TextureLoader().load(grass_light), [])
    ground_texture.wrapS = ground_texture.wrapT = THREE.RepeatWrapping
    ground_texture.repeat.set( 25, 25 )
    ground_texture.anisotropy = 16
    ground_texture.encoding = THREE.sRGBEncoding
    const block_texture = useMemo(() => new THREE.TextureLoader().load(block_texture_img), [])
    block_texture.magFilter = THREE.NearestFilter

    return(
        <Canvas
            colorManagement
        >
            <ambientLight intensity={ 0.5 } />
            <mesh
                rotation={[-Math.PI/2, 0, 0]}
                position={[0, ground_height, 0]}
            >
                <planeGeometry args={[100, 100]} />
                {/* <meshStandardMaterial attach="material" color="green" /> */}
                <meshStandardMaterial attach="material">
                    <primitive attach="map" object={ground_texture} />
                </meshStandardMaterial>
            </mesh>
            <LoadBlocks />

            <SelfAvatar ground_height={ground_height} keys={keys} not_allowed={not_allowed} />
        </Canvas>
    )
}
function CatchForestFruit() {
    useEffect(() => {
        document.addEventListener("keydown", e => {
            if (keys.hasOwnProperty(e.key.toLowerCase())) {
                keys[e.key.toLowerCase()] = true
            }
        })
        document.addEventListener("keyup", e => {
            if (keys.hasOwnProperty(e.key.toLowerCase())) {
                keys[e.key.toLowerCase()] = false
            }
            if (e.key == "Alt" || e.key == "Escape") {
                escape_game.style.display = "block"
            }
        })
    }, [])
    return (
        <div className="catchForestFruit">
            <CreateCanvas />
            <div className="escape_game">
                <h1>Click to play</h1>
            </div>
        </div>
    )
}

const LoadBlocks = () => {
    return(
        <>
            <CreateBlock position={[ 10, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 8, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 6, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 4, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 2, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 1, 0 ]} />
            <CreateBlock position={[ -2, ground_height + 1, 0 ]} />
            <CreateBlock position={[ -4, ground_height + 1, 0 ]} />
            <CreateBlock position={[ -6, ground_height + 1, 0 ]} />
            <CreateBlock position={[ -8, ground_height + 1, 0 ]} />
            <CreateBlock position={[ -10, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 10, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 8, ground_height + 1, 0 ]} />
            <CreateBlock position={[ 6, ground_height + 1, 2 ]} />
            <CreateBlock position={[ 4, ground_height + 1, 2 ]} />
            <CreateBlock position={[ 2, ground_height + 1, 2 ]} />
            <CreateBlock position={[ 0, ground_height + 1, 2 ]} />
            <CreateBlock position={[ -2, ground_height + 1, 2 ]} />
            <CreateBlock position={[ -4, ground_height + 1, 2 ]} />
            <CreateBlock position={[ -6, ground_height + 1, 2 ]} />
            <CreateBlock position={[ -8, ground_height + 1, 2 ]} />
            <CreateBlock position={[ -10, ground_height + 1, 2 ]} />
            <CreateBlock position={[ 6, ground_height + 1, 4 ]} />
            <CreateBlock position={[ 4, ground_height + 1, 4 ]} />
            <CreateBlock position={[ 2, ground_height + 1, 4 ]} />
            <CreateBlock position={[ 0, ground_height + 1, 4 ]} />
            <CreateBlock position={[ -2, ground_height + 1, 4 ]} />
            <CreateBlock position={[ -4, ground_height + 1, 4 ]} />
            <CreateBlock position={[ -6, ground_height + 1, 4 ]} />
            <CreateBlock position={[ -8, ground_height + 1, 4 ]} />
            <CreateBlock position={[ -10, ground_height + 1, 4 ]} />
            <CreateBlock position={[ 6, ground_height + 1, 6 ]} />
            <CreateBlock position={[ 4, ground_height + 1, 6 ]} />
            <CreateBlock position={[ 2, ground_height + 1, 6 ]} />
            <CreateBlock position={[ 0, ground_height + 1, 6 ]} />
            <CreateBlock position={[ -2, ground_height + 1, 6 ]} />
            <CreateBlock position={[ -4, ground_height + 1, 6 ]} />
            <CreateBlock position={[ -6, ground_height + 1, 6 ]} />
            <CreateBlock position={[ -8, ground_height + 1, 6 ]} />
            <CreateBlock position={[ -10, ground_height + 1, 6 ]} />

            <CreateBlock position={[ 0, ground_height + 4, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 6, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 8, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 10, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 12, 0 ]} />

            <CreateBlock position={[ 6, ground_height + 14, 0 ]} />
            <CreateBlock position={[ 4, ground_height + 14, 0 ]} />
            <CreateBlock position={[ 2, ground_height + 14, 0 ]} />
            <CreateBlock position={[ 0, ground_height + 14, 0 ]} />
            <CreateBlock position={[ -2, ground_height + 14, 0 ]} />
            <CreateBlock position={[ -4, ground_height + 14, 0 ]} />
            <CreateBlock position={[ -6, ground_height + 14, 0 ]} />

            <CreateBlock position={[ 0, ground_height + 5, 15 ]} />
        </>
    )
}

export default CatchForestFruit