import type { QueryClient, QueryKey } from "@tanstack/react-query";
import type { Project, ProjectResponse } from "../types/project.type.ts";
import type {ReorderTaskPayload, Task, TaskResponse} from "../types/task.type.ts";
import type {ReorderSectionPayload, Section, SectionResponse} from "../types/section.type.ts";
import type {Label, LabelsResponse} from "../types/label.type.ts";
import type {ViewOptionsPayload} from "../types/viewOptions.type.ts";

export type OptimisticUpdatesProjectContext = {
  previousData?: ProjectResponse;
  tempId?: string;
};

export type OptimisticUpdatesContext = {
  previousData?: [QueryKey, unknown][];
  tempId?: string;
}

export async function optimisticAddProject({
  queryClient,
  optimisticProject,
}: {
  queryClient: QueryClient;
  optimisticProject: Project;
}): Promise<OptimisticUpdatesProjectContext> {
  await queryClient.cancelQueries({ queryKey: ['projects'] });
  const previousData = queryClient.getQueryData<ProjectResponse>(['projects']);
  queryClient.setQueryData<ProjectResponse>(['projects'], (old) => ({
    results: old ? [...old.results, optimisticProject] : [optimisticProject],
    next_cursor: old?.next_cursor ?? "",
  }));
  return { previousData };
}

export async function optimisticUpdateProject({
  queryClient,
  projectId,
  optimisticProject,
}: {
  queryClient: QueryClient;
  projectId: string;
  optimisticProject: Partial<Project>;
}): Promise<OptimisticUpdatesProjectContext> {
  await queryClient.cancelQueries({ queryKey: ['projects'] });
  const previousData = queryClient.getQueryData<ProjectResponse>(['projects']);
  queryClient.setQueryData<ProjectResponse>(['projects'], (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.map((project) =>
        project.id === projectId
          ? { ...project, ...optimisticProject }
          : project,
      ),
    };
  });
  return { previousData };
}

export async function optimisticDeleteProject({
  queryClient,
  projectId,
}: {
  queryClient: QueryClient;
  projectId: string;
}): Promise<OptimisticUpdatesProjectContext> {
  await queryClient.cancelQueries({ queryKey: ['projects'] });
  const previousData = queryClient.getQueryData<ProjectResponse>(['projects']);
  queryClient.setQueryData<ProjectResponse>(['projects'], (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.filter((project) => project.id !== projectId),
    };
  });
  return { previousData };
}

export async function optimisticAddMyTask({
  queryClient,
  optimisticTask,
}: {
  queryClient: QueryClient;
  optimisticTask: Task;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey: ['tasks'] });
  const previousData = queryClient.getQueriesData<TaskResponse>({queryKey: ['tasks']});
  queryClient.setQueriesData<TaskResponse>({queryKey: ['tasks']}, old => {
    if (!old) return old;
    return {
      ...old,
      results: [...old.results, optimisticTask],
      next_cursor: old?.next_cursor ?? "",
    }
  });
  return { previousData };
}

export async function optimisticUpdateMyTask({
  queryClient,
  taskId,
  optimisticTask,
}: {
  queryClient: QueryClient;
  taskId: string;
  optimisticTask: Partial<Task>;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey: ['tasks'] });
  const previousData = queryClient.getQueriesData<TaskResponse>({queryKey: ['tasks']});
  queryClient.setQueriesData<TaskResponse>({queryKey: ['tasks']}, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.map((task) =>
        task.id === taskId ? { ...task, ...optimisticTask} : task,
      ),
    };
  });
  return { previousData };
}

export async function optimisticReorderMyTask({queryClient, payload}: {
  queryClient: QueryClient;
  payload: ReorderTaskPayload;
}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['tasks']});

  const previousData = queryClient.getQueriesData<TaskResponse>({queryKey: ['tasks']});
  queryClient.setQueriesData<TaskResponse>({queryKey: ['tasks']}, old => {
    if (!old) return old;
    const map = new Map(payload.items.map(item => [item.id, item.child_order]))

    const updated = old.results.map(task => {
      if(!task.id) return task
      if(map.has(task.id)){
        return {
          ...task,
          child_order: map.get(task.id),
        }
      }
      return task;
    })
    updated.sort((a, b) => (a.child_order ?? 0) - (b.child_order ?? 0))

    return {
      ...old,
      results: updated
    }
  })
  return {previousData};
}

export async function optimisticDeleteMyTask({
  queryClient,
  taskId,
}: {
  queryClient: QueryClient;
  taskId: string;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey: ['tasks'] });
  const previousData = queryClient.getQueriesData<TaskResponse>({queryKey: ['tasks']});
  queryClient.setQueriesData<TaskResponse>({queryKey: ['tasks']}, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.filter((task) => task.id !== taskId),
    };
  });
  return { previousData };
}

export async function optimisticAddSection({queryClient, optimisticSection}: {queryClient: QueryClient, optimisticSection: Section}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['sections']});
  const previousData = queryClient.getQueriesData<SectionResponse>({queryKey: ['sections']});
  queryClient.setQueriesData<SectionResponse>({queryKey: ['sections']}, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: [...old.results, optimisticSection],
      next_cursor: old.next_cursor ?? "",
    };
  });
  return { previousData };
}

export async function optimisticUpdateSection({queryClient, sectionId, optimisticSection}: {queryClient: QueryClient, sectionId: string, optimisticSection: Partial<Section>}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['sections']});
  const previousData = queryClient.getQueriesData<SectionResponse>({queryKey: ['sections']});
  queryClient.setQueriesData<SectionResponse>({queryKey: ['sections']}, old => {
    if(!old) return old;
    return {
      ...old,
      results: old.results.map(section => section.id === sectionId ? {...section, ...optimisticSection} : section),
    }
  })
  return { previousData };
}

export async function optimisticDeleteSection({queryClient, sectionId}: {queryClient: QueryClient, sectionId: string}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['sections']});
  const previousData = queryClient.getQueriesData<SectionResponse>({queryKey: ['sections']});   
  queryClient.setQueriesData<SectionResponse>({queryKey: ['sections']}, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.filter((section) => section.id !== sectionId),
    };
  });
  return { previousData };
}

export async function optimisticReorderSection({queryClient, payload}: {
  queryClient: QueryClient;
  payload: ReorderSectionPayload;
}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['sections']});
  const previousData = queryClient.getQueriesData<SectionResponse>({queryKey: ['sections']})
  queryClient.setQueriesData<SectionResponse>({queryKey: ['sections']}, old => {
    if(!old) return old;
    const map = new Map(payload.sections.map(item => [item.id, item.section_order]))

    const updated = old.results.map(section => {
      if(!section.id) return section
      if(map.has(section.id)){
        return {
          ...section,
          section_order: map.get(section.id),
        }
      }
      return section;
    })
    updated.sort((a, b) => (a.section_order ?? 0) - (b.section_order ?? 0))

    return {
      ...old,
      results: updated
    }
  })
  return {previousData}
}

export async function optimisticCreateLabel({queryClient, optimisticLabel}: {queryClient: QueryClient, optimisticLabel: Label}): Promise<OptimisticUpdatesContext>{
  await queryClient.cancelQueries({queryKey: ['labels']})
  const previousData = queryClient.getQueriesData<LabelsResponse>({queryKey: ['labels']});
  queryClient.setQueriesData<LabelsResponse>({queryKey: ['labels']}, old => {
    if(!old) return old;
    return {
      ...old,
      results: [...old.results, optimisticLabel],
      next_cursor: old.next_cursor ?? "",
    }
  })
  return { previousData };
}

export async function optimisticViewOptions({queryClient, optimisticViewOptions}: {queryClient: QueryClient, optimisticViewOptions: ViewOptionsPayload}): Promise<OptimisticUpdatesContext>{
  const key: QueryKey = [
      'viewOptions', optimisticViewOptions.view_type, optimisticViewOptions.object_id
  ]
  await queryClient.cancelQueries({queryKey: key});
  const previousData = queryClient.getQueryData<ViewOptionsPayload>(key);
  queryClient.setQueryData(key, (old) => {
    if(!old) return optimisticViewOptions;
    return {
      ...old,
      ...optimisticViewOptions
    }
  })
  return { previousData: previousData ? [[key, previousData]] : [] };
}

export function rollbackOptimisticProjectUpdates({
    queryClient,
    context}: {queryClient: QueryClient; context?: OptimisticUpdatesProjectContext}){
      if(context?.previousData){
        queryClient.setQueryData(['projects'], context.previousData)
      }
}

export function rollbackOptimisticUpdates({
  queryClient,
  context,
}: {
  queryClient: QueryClient;
  context?: OptimisticUpdatesContext;
}) {
  context?.previousData?.forEach(([key, data]) => {
    queryClient.setQueryData(key, data)
  })
}
