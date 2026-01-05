import {jest } from '@jest/globals';
import { mockRequest, mockResponse } from '../mocks/express.js';
import { mockCreatedTask, mockNewTaskData, mockTask, mockTasks } from '../mocks/taskData.js';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../../../controllers/taskController.js';
import Task from '../../../models/Task.js';

jest.mock('../../../models/Task.js');

describe('Task Controller - Unit Tests with Mocks (Supabase)', () => {

    // Clear all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            // Arrange
            const req = mockRequest({ query: {} });
            const res = mockResponse();

            Task.findAll = jest.fn().mockResolvedValue(mockTasks);

            // Act
            await getAllTasks(req, res);

            // Assert
            expect(Task.findAll).toHaveBeenCalledWith({});
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                count: 3,
                data: mockTasks,
            });
        });

        it('should filter by completed status', async () => {
            // Arrange
            const req = mockRequest({ query: { completed: 'true' } });
            const res = mockResponse();

            const completedTasks = mockTasks.filter(t => t.completed);
            Task.findAll = jest.fn().mockResolvedValue(completedTasks);

            // Act
            await getAllTasks(req, res);

            // Assert
            expect(Task.findAll).toHaveBeenCalledWith({ completed: true });
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                count: 1,
                data: completedTasks,
            });
        });

        it('should return empty array when no tasks', async () => {
            // Arrange
            const req = mockRequest({ query: {} });
            const res = mockResponse();

            Task.findAll = jest.fn().mockResolvedValue([]);

            // Act
            await getAllTasks(req, res);

            // Assert
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                count: 0,
                data: [],
            });
        });

        it('should handle errors', async () => {
            // Arrange
            const req = mockRequest({ query: {} });
            const res = mockResponse();

            const errorMessage = 'Supabase error';
            Task.findAll = jest.fn().mockRejectedValue(new Error(errorMessage));

            // Act
            await getAllTasks(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Error fetching tasks',
                error: errorMessage,
            });
        });
    });

    describe('getTaskById', () => {
        it('should return task by id', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '4' } });
            const res = mockResponse();

            Task.findByID = jest.fn().mockResolvedValue(mockTask);

            // Act
            await getTaskById(req, res);

            // Assert
            expect(Task.findByID).toHaveBeenCalledWith('4');
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockTask,
            });
        });

        it('should return 404 when task not found', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '999' } });
            const res = mockResponse();

            Task.findByID = jest.fn().mockResolvedValue(null);

            // Act
            await getTaskById(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Task not found',
            });
        });

        it('should handle errors', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '4' } });
            const res = mockResponse();

            Task.findByID = jest.fn().mockRejectedValue(new Error('Supabase error'));

            // Act
            await getTaskById(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Error fetching task',
                error: 'Supabase error',
            });
        });
    });

    describe('createTask', () => {
        it('should create new task', async () => {
            // Arrange
            const req = mockRequest({ body: mockNewTaskData });
            const res = mockResponse();

            Task.create = jest.fn().mockResolvedValue(mockCreatedTask);

            // Act
            await createTask(req, res);

            // Assert
            expect(Task.create).toHaveBeenCalledWith({
                title: mockNewTaskData.title,
                description: mockNewTaskData.description,
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedTask,
            });
        });

        it('should return 400 on validation error (no title)', async () => {
            // Arrange
            const req = mockRequest({ body: { description: 'No title' } });
            const res = mockResponse();

            Task.create = jest.fn().mockRejectedValue(new Error('Title is required'));

            // Act
            await createTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation error',
                error: 'Title is required',
            });
        });

        it('should return 400 when title exceeds 100 characters', async () => {
            // Arrange
            const longTitle = 'a'.repeat(101);
            const req = mockRequest({ body: { title: longTitle } });
            const res = mockResponse();

            Task.create = jest.fn().mockRejectedValue(new Error('Title cannot exceed 100 characters'));

            // Act
            await createTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should handle general errors', async () => {
            // Arrange
            const req = mockRequest({ body: mockNewTaskData });
            const res = mockResponse();

            Task.create = jest.fn().mockRejectedValue(new Error('Supabase error'));

            // Act
            await createTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Error creating task',
                error: 'Supabase error',
            });
        });
    });

    describe('updateTask', () => {
        it('should update task', async () => {
            // Arrange
            const updatedData = { title: 'Updated Title', completed: true };
            const req = mockRequest({
                params: { id: '4' },
                body: updatedData
            });
            const res = mockResponse();

            const updatedTask = { ...mockTask, ...updatedData };
            Task.update = jest.fn().mockResolvedValue(updatedTask);

            // Act
            await updateTask(req, res);

            // Assert
            expect(Task.update).toHaveBeenCalledWith('4', updatedData);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: updatedTask,
            });
        });

        it('should return 404 when task not found', async () => {
            // Arrange
            const req = mockRequest({
                params: { id: '999' },
                body: { title: 'Updated' }
            });
            const res = mockResponse();

            Task.update = jest.fn().mockResolvedValue(null);

            // Act
            await updateTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Task not found',
            });
        });

        it('should handle validation errors', async () => {
            // Arrange
            const req = mockRequest({
                params: { id: '4' },
                body: { title: '' }
            });
            const res = mockResponse();

            Task.update = jest.fn().mockRejectedValue(new Error('Title is required'));

            // Act
            await updateTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should handle general errors', async () => {
            // Arrange
            const req = mockRequest({
                params: { id: '4' },
                body: { title: 'Updated' }
            });
            const res = mockResponse();

            Task.update = jest.fn().mockRejectedValue(new Error('Supabase error'));

            // Act
            await updateTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('deleteTask', () => {
        it('should delete task', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '4' } });
            const res = mockResponse();

            Task.delete = jest.fn().mockResolvedValue(mockTask);

            // Act
            await deleteTask(req, res);

            // Assert
            expect(Task.delete).toHaveBeenCalledWith('4');
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Task deleted successfully',
                data: mockTask,
            });
        });

        it('should return 404 when task not found', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '999' } });
            const res = mockResponse();

            Task.delete = jest.fn().mockResolvedValue(null);

            // Act
            await deleteTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Task not found',
            });
        });

        it('should handle errors', async () => {
            // Arrange
            const req = mockRequest({ params: { id: '4' } });
            const res = mockResponse();

            Task.delete = jest.fn().mockRejectedValue(new Error('Supabase error'));

            // Act
            await deleteTask(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Error deleting task',
                error: 'Supabase error',
            });
        });
    });
});