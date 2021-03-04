import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree, extend } from "react-three-fiber"

const speed = 0.075
const rotationSpeed = 0.5
const PIXELS_PER_ROUND = 1800
const colissionTremble = 1
const colission_leaks = 10
// don't set it to low, then the avatar can go throught things
const hand_leg_distance = 0.55
const hand_leg_speed = 8
let avatar
let keys
let weapon, weapon_front, right_hand, left_hand, right_leg, left_leg
let ground_height

let isLocked = false
let not_allowed = []

let camera_z
let camera_y
let marker
let y_marker
let lv_camera

const actionByKey = (key) => {
    key = key.toLowerCase()
    return keys[key]
}
document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement == null) {
        isLocked = false
    } else {
        isLocked = true
    }
})
function DetectCollisions(value) {
    var vector = new THREE.Vector3(0, ground_height, 0)
    var ray = new THREE.Raycaster(marker.current.position, vector)
    var intersects = ray.intersectObjects(not_allowed)

    if (value == "get") return intersects

    if (intersects.length > 0) return true
    else return false
}
function Camera(props) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    useEffect(() => void setDefaultCamera(ref.current), [])
    // is not working:
    // useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}

const moveColission = (moveDirection) => {
    var intersects = DetectCollisions("get")
    var current_speed
    current_speed = speed

    // if (marker.current.position.z > (intersects[0].object.position.z + intersects[0].object.geometry.parameters.depth/3 - current_speed*2)) {
    //     marker.current.position.z += speed*colissionTremble
    // }
    // if (marker.current.position.z < (intersects[0].object.position.z - intersects[0].object.geometry.parameters.depth/3 + current_speed*2)) {
    //     marker.current.position.z -= speed*colissionTremble
    // }
    // if (marker.current.position.x > (intersects[0].object.position.x + intersects[0].object.geometry.parameters.depth/3 - current_speed*2)) {
    //     marker.current.position.x += speed*colissionTremble
    // }
    // if (marker.current.position.x < (intersects[0].object.position.x - intersects[0].object.geometry.parameters.depth/3 + current_speed*2)) {
    //     marker.current.position.x -= speed*colissionTremble
    // }
    intersects.forEach(e => {
        if (marker.current.position.z > (e.object.position.z + e.object.geometry.parameters.depth/2 - current_speed*colission_leaks)) {
            marker.current.position.z += speed*colissionTremble
        }
        if (marker.current.position.z < (e.object.position.z - e.object.geometry.parameters.depth/2 + current_speed*colission_leaks)) {
            marker.current.position.z -= speed*colissionTremble
        }
        if (marker.current.position.x > (e.object.position.x + e.object.geometry.parameters.depth/2 - current_speed*colission_leaks)) {
            marker.current.position.x += speed*colissionTremble
        }
        if (marker.current.position.x < (e.object.position.x - e.object.geometry.parameters.depth/2 + current_speed*colission_leaks)) {
            marker.current.position.x -= speed*colissionTremble
        }
    })
    switch (moveDirection) {
        case "w": {

            break
        }
        case "s": {

            break
        }
        case "a": {

            break
        }
        case "d": {

            break
        }
    }
}

var clock = new THREE.Clock(true)
function animate() {
    requestAnimationFrame(animate)
    try {
        if (keys["w"]) {
            marker.current.translateZ( -speed )
            if (DetectCollisions() == true) moveColission("w")
        }
        if (keys["s"]) {
            marker.current.translateZ( speed )
            if (DetectCollisions() == true) moveColission("s")
        }
        if (keys["a"]) {
            marker.current.translateX( -speed )
            if (DetectCollisions() == true) moveColission("a")
        }
        if (keys["d"]) {
            marker.current.translateX( speed )
            if (DetectCollisions() == true) moveColission("d")
        }
        lv_camera.lookAt(marker.current.position)

        weapon_front.current.rotation.z += 0.25
        if (keys["w"] || keys["s"] || keys["a"] || keys["d"]) {
            var position = Math.sin(clock.getElapsedTime()*hand_leg_speed) * hand_leg_distance
            right_hand.current.position.z = position
            left_hand.current.position.z = -position
            right_leg.current.position.z = -position
            left_leg.current.position.z = position
        }
    } catch (error) {
        console.log(error)
    }
}
function mouseOnMove() {
    document.body.addEventListener("mousemove", function (e) {
        if (isLocked == false) return
        if (marker !== undefined && marker.current !== undefined) {
            marker.current.rotation.y -= 2 * Math.PI * e.movementX / PIXELS_PER_ROUND * rotationSpeed
            // var camera_position_z = 2 * Math.PI * e.movementY / PIXELS_PER_ROUND * rotationSpeed
            // camera.position.z -= camera_position_z
            // camera.position.z -= 2 * Math.PI * e.movementY / PIXELS_PER_ROUND * rotationSpeed
            // var camera_positon_y_change = 2 * Math.PI * ( Math.sin(e.movementY) * 10 ) / PIXELS_PER_ROUND * rotationSpeed
            // var camera_positon_y_change = speed * Math.sin(camera.position.y * Math.PI)
            // camera.position.y -= camera_positon_y_change
    
    
            var rotation_x = 2 * Math.PI * e.movementY / PIXELS_PER_ROUND * rotationSpeed
            y_marker.current.rotation.x -= rotation_x
            avatar.current.rotation.x += rotation_x
            if (y_marker.current.rotation.x <= (-Math.PI/2 + 0.2)) {
                y_marker.current.rotation.x += rotation_x
                avatar.current.rotation.x -= rotation_x
            }
            if (y_marker.current.rotation.x > 0.3) {
                y_marker.current.rotation.x += rotation_x
                avatar.current.rotation.x -= rotation_x
            }
        }
    })
}
function SelfAvatar(props) {
    var { camera, gl } = useThree()
    not_allowed = props.not_allowed

    avatar = props.avatar
    marker = useRef()
    y_marker = useRef()

    camera_z = camera.position.z
    camera_y = camera.position.y

    keys = props.keys
    ground_height = props.ground_height

    avatar = useRef()
    weapon = useRef()
    weapon_front = useRef()
    right_hand = useRef()
    left_hand = useRef()
    right_leg = useRef()
    left_leg = useRef()

    lv_camera = camera

    useEffect(() => {
        not_allowed = not_allowed.map(e => e = e.current)
    })

    mouseOnMove()
    animate()
    return (
        <>
        { props.children }
        <group ref={ marker } position={[ 0, 0, 20 ]}>
            <group ref={ y_marker }>
                <group ref={ avatar } rotation={[ 0, Math.PI, 0 ]}>
                    <mesh position={[ 0, 0, 0 ]} castShadow>
                        <sphereGeometry args={[ 1, 10, 10 ]} />
                        <meshNormalMaterial attach="material" />
                    </mesh>
                    <mesh ref={ left_hand } position={[ 1.5, 0, 0 ]}>
                        <sphereGeometry args={[ 0.5, 10, 10 ]} />
                        <meshNormalMaterial attach="material" />
                    </mesh>
                    <mesh ref={ left_leg } position={[ 1, -1, 0 ]}>
                        <sphereGeometry args={[ 0.5, 10, 10 ]} />
                        <meshNormalMaterial attach="material" />
                    </mesh>
                    <mesh ref={ right_leg } position={[ -1, -1, 0 ]}>
                        <sphereGeometry args={[ 0.5, 10, 10 ]} />
                        <meshNormalMaterial attach="material" />
                    </mesh>

                    <group ref={ right_hand } position={[ 0, 0, 0 ]}>
                        <mesh position={[ -1.25, 0, 0 ]} rotation={[ 0, 0, Math.PI/2 ]}>
                            <cylinderGeometry args={[ 0.1, 0.1, 1 ]} />
                            <meshNormalMaterial attach="material" />
                        </mesh>
                        <mesh
                            castShadow
                            position={[-1.4, -0.1, 0]}
                            ref={ weapon }
                        >
                            <boxBufferGeometry args={[ 0.8, 0.8, 0.8 ]} />
                            {/* <meshStandardMaterial attach="material" color="pink" speed={1} factor={0.6} /> */}
                            <meshStandardMaterial attach="material" color="darkred" />
                        </mesh>
                        <mesh
                            castShadow
                            position={[-1.4, -0.1, 0.5]}
                            ref={ weapon_front }
                        >
                            <boxBufferGeometry args={[ 0.3, 0.3, 1.5 ]} />
                            {/* <meshStandardMaterial attach="material" color="pink" speed={1} factor={0.6} /> */}
                            <meshStandardMaterial attach="material" color="red" />
                        </mesh>
                    </group>
                </group>
                <Camera
                    position={[ 0, 1, 7.5 ]}
                />
            </group>
        </group>
        </>
    )
}

export default SelfAvatar
