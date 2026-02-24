import {closestCenter, type CollisionDetection, pointerWithin} from "@dnd-kit/core";

export const customCollisionDetection: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args)
    if(pointerCollisions.length === 0){
        return closestCenter(args)
    }
    const collision = pointerCollisions[0]
    const {id} = collision

    const droppable = args.droppableContainers.find(container => container.id === id)

    if(!droppable){
        return pointerCollisions
    }

    const rect = droppable.rect.current
    if(!rect) return pointerCollisions

    const pointerY = args.pointerCoordinates?.y
    if(!pointerY){
        return pointerCollisions
    }

    const top = rect.top
    const bottom = rect.bottom
    const height = rect.height

    const upperThreshold = top + height * 0.25
    const lowerThreshold = bottom - height * 0.25

    let dropType: "inside" | "between"

    if(pointerY > upperThreshold && pointerY < lowerThreshold){
        dropType = "inside"
    }else{
        dropType = "between"
    }
    droppable.data.current = {
        ...droppable.data.current,
        dropType
    }
    return pointerCollisions
}