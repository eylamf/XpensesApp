// @flow

import type {CompanySource, ColorGroup} from '../utils/Types';

class Company {
  id: string;
  name: string;
  logoURI: number | string;
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

  getInitials(): string {
    return this.name.charAt(0);
    // const arr = this.name.split(' ');

    // let initials = '';

    // arr.forEach(part => {
    //   initials += part.charAt(0).toUpperCase();
    // });

    // return initials;
  }

  setColorGroup(colorGroup: ColorGroup) {
    this.colorGroup = colorGroup;
  }
}

export default Company;
