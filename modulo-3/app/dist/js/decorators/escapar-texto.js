export function escaparTexto() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let originalReturn = originalMethod.apply(this, args);
            if (typeof originalReturn === "string") {
                originalReturn = originalReturn.replace(/<script>[\s\S]*?<\/script>/, "");
            }
            return originalReturn;
        };
        return descriptor;
    };
}
//# sourceMappingURL=escapar-texto.js.map