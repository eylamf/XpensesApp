// @flow

import type {CompanySource, ColorGroup} from '../utils/Types';

class Company {
  id: string;
  name: string;
  logoURI: number | string;
  filledLogo: ?number;
  colorGroup: ColorGroup;
  forceTint: boolean;
  useFilled: boolean;

  constructor(source: CompanySource) {
    const {id, name, logoURI, filledLogo, colorGroup, forceTint} = source;

    this.id = this._formatID(id);
    this.name = name;
    this.logoURI = logoURI;
    this.filledLogo = filledLogo || null;
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

  hasFilledLogo(): boolean {
    return this.filledLogo != null;
  }

  _formatID(passedID: string): string {
    const split = passedID.split(' ');

    if (split.length === 1) {
      return passedID;
    }

    return split.join('_');
  }
}

export default Company;
