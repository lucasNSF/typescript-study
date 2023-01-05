export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`---- Método ${propertyKey} ----`);
    console.log(`Parâmetros: ${JSON.stringify(args)}`);
    const originalReturn = originalMethod.apply(this, args);
    console.log(`Retorno: ${JSON.stringify(originalReturn)}`);
    return originalReturn;
  };

  return descriptor;
}
