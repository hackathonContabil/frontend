export function maskCnpj(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');

  return v;
}

export function maskCRC(c) {
  if (c.length === 9) {
    c = c + '/';
  }

  if (c.length === 11) {
    c = c + '-';
  }

  return c;
}

export function removeMaskCRC(j) {
  let value = j.replace('/', '');
  value = value.replace('-', '');

  return value;
}
