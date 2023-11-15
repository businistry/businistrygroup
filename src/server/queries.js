import HttpError from '@wasp/core/HttpError.js'

export const getVentures = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Venture.findMany({
    where: { userId: context.user.id },
    select: { name: true, location: true, viabilityScore: true }
  })
}

export const getVenture = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const venture = await context.entities.Venture.findUnique({
    where: { id: args.ventureId, userId: context.user.id },
    select: { name: true, location: true, viabilityScore: true }
  });

  if (!venture) throw new HttpError(404, 'No venture found');

  return venture;
}