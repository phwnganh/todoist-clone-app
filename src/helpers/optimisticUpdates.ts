import type { QueryClient, QueryKey } from "@tanstack/react-query";
import type { Project, ProjectResponse } from "../types/project.type.ts";
import type { Task, TaskResponse } from "../types/task.type.ts";

export type OptimisticUpdatesContext = {
  previousData?: ProjectResponse | TaskResponse;
  tempId?: string;
};

export async function optimisticAddProject({
  queryClient,
  queryKey,
  optimisticProject,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  optimisticProject: Project;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<ProjectResponse>(queryKey);
  queryClient.setQueryData<ProjectResponse>(queryKey, (old) => ({
    results: old ? [...old.results, optimisticProject] : [optimisticProject],
    next_cursor: old?.next_cursor ?? "",
  }));
  return { previousData };
}

export async function optimisticUpdateProject({
  queryClient,
  queryKey,
  projectId,
  optimisticProject,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  projectId: string;
  optimisticProject: Partial<Project>;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<ProjectResponse>(queryKey);
  queryClient.setQueryData<ProjectResponse>(queryKey, (old) => {
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
  queryKey,
  projectId,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  projectId: string;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<ProjectResponse>(queryKey);
  queryClient.setQueryData<ProjectResponse>(queryKey, (old) => {
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
  queryKey,
  optimisticTask,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  optimisticTask: Task;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<TaskResponse>(queryKey);
  queryClient.setQueryData<TaskResponse>(queryKey, (old) => ({
    results: old ? [...old.results, optimisticTask] : [optimisticTask],
    next_cursor: old?.next_cursor ?? "",
  }));
  return { previousData };
}

export async function optimisticUpdateMyTask({
  queryClient,
  queryKey,
  taskId,
  optimisticTask,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  taskId: string;
  optimisticTask: Partial<Task>;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<TaskResponse>(queryKey);
  queryClient.setQueryData<TaskResponse>(queryKey, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.map((task) =>
        task.id === taskId ? { ...task, ...optimisticTask } : task,
      ),
    };
  });
  return { previousData };
}

export async function optimisticDeleteMyTask({
  queryClient,
  queryKey,
  taskId,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  taskId: string;
}): Promise<OptimisticUpdatesContext> {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<TaskResponse>(queryKey);
  queryClient.setQueryData<TaskResponse>(queryKey, (old) => {
    if (!old) return old;
    return {
      ...old,
      results: old.results.filter((task) => task.id !== taskId),
    };
  });
  return { previousData };
}
export function rollbackOptimisticUpdates({
  queryClient,
  queryKey,
  context,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  context?: OptimisticUpdatesContext;
}) {
  if (context?.previousData) {
    queryClient.setQueryData(queryKey, context.previousData);
  }
}
