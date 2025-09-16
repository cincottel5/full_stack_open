// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const thereIsANotNumber = (argument: any[]) => {
  for ( const a of argument) {
    if (isNotNumber(a)) return true
  }

  return false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const thereIsNull = (args: any[]) => {
  for (const a of args)
    if (a === null || a === undefined) return true

  return false
}

export const parseArguments = (
  argv: string[],
  minArguments: number,
  maxArguments: number | null = null
): number[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_compiler, _fileName, ...args] = argv;

  if (args.length < minArguments) throw new Error("Not enough arguments");
  if (maxArguments != null && args.length < maxArguments)
    throw new Error("Too many arguments");

  const parsedArgs = args.map((a) => {
    if (isNotNumber(a)) throw new Error(`Argument ${a} is not number`);
    return Number(a);
  });

  return parsedArgs;
};
