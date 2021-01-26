import type { IsEmpty, DeepReadonly } from './utils';

{
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  const shouldBeEmpty: IsEmpty<{}> = true;
}

{
  const empty = {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldBeEmpty: IsEmpty<typeof empty> = true;
}

{
  const notEmpty = { name: 'Oxter' };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldBeEmpty: IsEmpty<typeof notEmpty> = false;
}

{
  const notEmpty = { key: undefined };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldBeEmpty: IsEmpty<typeof notEmpty> = false;
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const readonlyfied: DeepReadonly<{ name: string }> = { name: 'Oxter' };

  // This should cause error TS2540:
  // readonlyfied.name = 'Rhabdomancy';
}

{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const readonlyfied: DeepReadonly<{ user: { address: { street: string } } }> = { user: { address: { street: 'Carriage Drive' } } };

  // This should cause error TS2540:
  // readonlyfied.user.address.street = 'Lake Avenue';
}
