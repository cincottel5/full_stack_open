export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const parseArguments = (
  argv: string[],
  minArguments: number,
  maxArguments: number | null = null
): number[] => {
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
