class ImmediateExecutor {
    async execute(task) {
        const result = await task.task();
        return result;
    }
}

export { ImmediateExecutor };
//# sourceMappingURL=immediate-executor.js.map
