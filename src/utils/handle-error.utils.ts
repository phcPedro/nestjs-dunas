import { UnprocessableEntityException } from '@nestjs/common';

export function handleError(error: Error):undefined{
  const errorLines = error.message?.split('/n');
  const lastErrorline = errorLines[errorLines.length - 1 ]?.trim();

  if (!lastErrorline){
    console.error(error);
  }

  throw new UnprocessableEntityException(
    lastErrorline || 'Algum erro ocorreu ao executar a operação.',
  );
}