import type {Task, TaskNode} from "../types/task.type.ts";
import {useMemo} from "react";

export const useTaskTreeMultiLevel = (tasks: Task[] | undefined, projectId: string, sectionId?: string | null): TaskNode[] => {
    return useMemo(() => {
        if(!tasks) return []
        // filter tasks by project
        const projectTasks = tasks.filter(task => {
            if(task.project_id !== projectId) return false;

            if(sectionId === null){
                return task.section_id === null;
            }
            if(sectionId){
                return task.section_id === sectionId;
            }
            return true;
        })

        // map id to node
        const myTaskNodeMap = new Map<string, TaskNode>()

        projectTasks.forEach(task => {
            myTaskNodeMap.set(task.id, {
                task,
                children: []
            })
        })

        // build tree
        const myTaskRoots: TaskNode[] = []
        myTaskNodeMap.forEach(node => {
            const parentId = node.task.parent_id

            if(parentId && myTaskNodeMap.has(parentId)) {
                myTaskNodeMap.get(parentId)!.children.push(node)
            }else{
                // set parent_id = null
                myTaskRoots.push(node)
            }
        })

        // sort tree
        const sortTree = (nodes: TaskNode[]) => {
            nodes.sort((a, b) => (a.task.child_order ?? 0) - (b.task.child_order ?? 0))
            nodes.forEach(node => sortTree(node.children))
        }

        sortTree(myTaskRoots)
        return myTaskRoots;
    }, [tasks, projectId, sectionId]);
}