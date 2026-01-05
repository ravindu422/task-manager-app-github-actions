export const mockTasks = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        created_at: new Date('2024-01-01').toISOString(),
        updated_at: new Date('2024-01-01').toISOString(),
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
        created_at: new Date('2024-01-02').toISOString(),
        updated_at: new Date('2024-01-02').toISOString(),
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        completed: false,
        created_at: new Date('2024-01-03').toISOString(),
        updated_at: new Date('2024-01-03').toISOString(),
    },
];

export const mockTask = {
    id: 4,
    title: 'Single Task',
    description: 'Single Description',
    completed: false,
    created_at: new Date('2024-01-04').toISOString(),
    updated_at: new Date('2024-01-04').toISOString(),
};

export const mockNewTaskData = {
    title: 'New Task',
    description: 'New Descrpiption',
};

export const mockCreatedTask = {
    id: 5,
    ...mockNewTaskData,
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};