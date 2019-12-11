// @flow

import type {CompanySource, ColorGroup} from '../utils/Types';

class Company {
  id: string;
  name: string;
  logoURI: string;
  colorGroup: ColorGroup;
  forceTint: boolean;

  constructor(source: CompanySource) {
    const {id, name, logoURI, colorGroup, forceTint} = source;

    this.id = id;
    this.name = name;
    this.logoURI = logoURI;
    this.colorGroup = colorGroup;
    this.forceTint = forceTint || false;
  }
}

export default Company;
