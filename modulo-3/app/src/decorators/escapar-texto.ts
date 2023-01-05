export function escaparTexto() {
  return function (
    target: any,
    propertyKey: String,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let originalReturn = originalMethod.apply(this, args);
      if (typeof originalReturn === "string") {
        originalReturn = originalReturn.replace(
          /<script>[\s\S]*?<\/script>/,
          ""
        );
      }
      return originalReturn;
    };

    return descriptor;
  };
}
