// @flow

import type {CompanySource} from '../utils/Types';

class Company {
  id: string;
  name: string;
  logoURI: string;
  color: string;
  tint1: string;
  tint2: string;
  forceTint: boolean;

  constructor(source: CompanySource) {
    const {id, name, logoURI, color, tint1, tint2, forceTint} = source;

    this.id = id;
    this.name = name;
    this.logoURI = logoURI;
    this.color = color;
    this.tint1 = tint1;
    this.tint2 = tint2;
    this.forceTint = forceTint || false;
  }
}

export default Company;
