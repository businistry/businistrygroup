import HttpError from '@wasp/core/HttpError.js'
import { computeViabilityScore } from "./aiService.js"

export const calculateViabilityScore = (name, location) => {
  // AI service implementation here
  return Math.random() * 10;
}

export const createVenture = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Call AI service to compute viability score
  const viabilityScore = await computeViabilityScore(args.name, args.location);

  // Save venture in database
  const venture = await context.entities.Venture.create({
    data: {
      name: args.name,
      location: args.location,
      viabilityScore,
      user: { connect: { id: context.user.id } }
    }
  });

  return venture;
}

export const updateVenture = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id, input } = args;
  const { name, location } = input;

  const venture = await context.entities.Venture.findUnique({
    where: { id },
  });

  if (venture.userId !== context.user.id) { throw new HttpError(403) };

  if (name !== venture.name || location !== venture.location) {
    venture.viabilityScore = calculateViabilityScore(name, location);
  }

  return context.entities.Venture.update({
    where: { id },
    data: { name, location, viabilityScore: venture.viabilityScore },
  });
}