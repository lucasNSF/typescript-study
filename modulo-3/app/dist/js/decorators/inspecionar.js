export function inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`---- Método ${propertyKey} ----`);
        console.log(`Parâmetros: ${JSON.stringify(args)}`);
        const originalReturn = originalMethod.apply(this, args);
        console.log(`Retorno: ${JSON.stringify(originalReturn)}`);
        return originalReturn;
    };
    return descriptor;
}
//# sourceMappingURL=inspecionar.js.map