import { Engine, MeshBuilder, RecastJSPlugin, Scene } from "@babylonjs/core"

import Recast from "recast-detour"

export async function createScene(engine: Engine) {
    let scene = new Scene(engine)
    let ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene)

    // let recast = await Recast()
    let recast = await new Recast()

    let recastPlugin = new RecastJSPlugin(recast)

    recastPlugin.createNavMesh([ground], {
        cs: 0.2,
        ch: 0.2,
        walkableSlopeAngle: 35,
        walkableHeight: 1,
        walkableClimb: 1,
        walkableRadius: 1,
        maxEdgeLen: 12,
        maxSimplificationError: 1.3,
        minRegionArea: 8,
        mergeRegionArea: 20,
        maxVertsPerPoly: 6,
        detailSampleDist: 6,
        detailSampleMaxError: 1,
    })


    scene.createDefaultCameraOrLight(true, true, true)
    return scene
}